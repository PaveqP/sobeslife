import { WebSocketServer } from 'ws';

const wss = new WebSocketServer({ port: 8080 });

const sessions: Map<string, { testId: number; progress: any[] }> = new Map();

console.log('test');
wss.on('connection', (ws) => {
  console.log('User connected');

  const sessionId = Math.random().toString(36).substring(2, 9);
  sessions.set(sessionId, { testId: 0, progress: [] });

  ws.send(JSON.stringify({ type: 'session_start', sessionId }));

  ws.on('message', (message) => {
    const data = JSON.parse(message.toString());

    switch (data.type) {
      case 'start_test': {
        const test = loadTest(data.testId);
        sessions.set(sessionId, { testId: data.testId, progress: [] });
        ws.send(JSON.stringify({ type: 'test_data', test }));
        break;
      }
      case 'submit_answer': {
        const session = sessions.get(sessionId);
        if (session) {
          session.progress.push({
            questionId: data.questionId,
            answerId: data.answerId,
            isCorrect: checkAnswer(data.questionId, data.answerId),
          });
        }
        break;
      }
      case 'end_test': {
        const result = calculateResults(sessionId);
        ws.send(JSON.stringify({ type: 'test_result', result }));
        sessions.delete(sessionId);
        break;
      }
      default:
        ws.send(JSON.stringify({ error: 'Unknown message type' }));
    }
  });

  ws.on('close', () => {
    console.log('User disconnected');
    sessions.delete(sessionId);
  });
});

// Заглушка для загрузки теста
function loadTest(testId: number) {
  return {
    id: testId,
    questions: [
      { id: 1, text: 'Question 1?', options: ['A', 'B', 'C'], correct: 0 },
      { id: 2, text: 'Question 2?', options: ['X', 'Y', 'Z'], correct: 2 },
    ],
  };
}

function checkAnswer(questionId: number, answerId: number) {
  return Math.random() < 0.5;
}

function calculateResults(sessionId: string) {
  const session = sessions.get(sessionId);
  if (!session) return null;

  const correctAnswers = session.progress.filter((p) => p.isCorrect).length;
  return {
    correctAnswers,
    totalQuestions: session.progress.length,
    score: ((correctAnswers / session.progress.length) * 100).toFixed(2) + '%',
  };
}
