import { RowDataPacket } from 'mysql2';
import connectDb from './db';

export const getAllUsers = async () => {
  const db = await connectDb();
  const [rows] = await db.execute('SELECT * FROM user');
  return rows;
};

export const getUserByLogin = async (login: string) => {
  const db = await connectDb();
  const [rows] = await db.execute<RowDataPacket[]>(
    'SELECT * FROM user WHERE login = ?',
    [login]
  );
  return rows;
};
