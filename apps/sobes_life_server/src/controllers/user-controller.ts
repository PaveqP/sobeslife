import { getAllUsers } from '@sobes-life-server/data-access';
import { NextFunction, Request, Response } from 'express';

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
