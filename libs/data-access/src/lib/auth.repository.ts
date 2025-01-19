import { QueryResult, ResultSetHeader } from 'mysql2';
import connectDb from './db';
import { successfullyResponsesTexts } from '@sobes-life-server/shared-utils';

export const registrationNewUser = async (
  login: string,
  password: string
): Promise<string | QueryResult> => {
  const db = await connectDb();
  try {
    await db.execute<ResultSetHeader>(
      'INSERT INTO user (login, password) VALUES (?, ?)',
      [login, password]
    );
    return successfullyResponsesTexts.successfullyReg;
  } catch (error) {
    console.error(error);
    return `Error registering user: ${(error as Error).message}`;
  }
};
