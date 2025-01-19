import {
  getUserByLogin,
  registrationNewUser,
} from '@sobes-life-server/data-access';
import {
  loginValidator,
  passwordValidator,
} from '@sobes-life-server/shared-utils';
import { NextFunction, Request, Response } from 'express';

export const registration = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body;
  const userExists = await getUserByLogin(login);
  if (Array.isArray(userExists) && userExists.length > 0) {
    res
      .status(400)
      .json({ message: `Error: User with login "${login}" already exists.` });
    return;
  }
  if (!loginValidator(login)) {
    res.status(400).json({ message: 'invalid login' });
    return;
  }
  if (!passwordValidator(password)) {
    res.status(400).json({ message: 'invalid password' });
    return;
  }
  try {
    const result = await registrationNewUser(login, password);
    res.status(200).json({ message: result });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
