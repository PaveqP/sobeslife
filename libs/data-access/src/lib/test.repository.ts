import connectDb from './db';

export const getQuestionsBySpecializationAndLevel = async (
  specialization: string,
  level: string
) => {
  try {
    const db = await connectDb();
    const [rows] = await db.execute(
      'SELECT * FROM question WHERE specialization = ? AND level = ?',
      [specialization, level]
    );
    return rows;
  } catch (error) {
    return error;
  }
};
