import {
  getUserByLogin,
  registrationNewUser,
} from '@sobes-life-server/data-access';
import {
  comparePasswords,
  generateToken,
  hashPassword,
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
    const hashedPassword = await hashPassword(password);
    const result = await registrationNewUser(login, hashedPassword);
    res.status(200).json({ message: result });
  } catch (error) {
    console.error(error);
    next(error);
  }
};

export const authorization = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { login, password } = req.body;
  if (!loginValidator(login)) {
    res.status(400).json({ message: 'invalid login' });
    return;
  }
  if (!passwordValidator(password)) {
    res.status(400).json({ message: 'invalid password' });
    return;
  }

  try {
    const user = await getUserByLogin(login);
    if (user.length === 0) {
      return res
        .status(400)
        .json({ message: `Invalid credentials. User ${login} was not found` });
    }
    const isPasswordValid = await comparePasswords(
      password,
      user[0]['password']
    );
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    const token = generateToken(user[0]['id']);
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    next(error);
  }

  return null;
};
