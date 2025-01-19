import { NextFunction, Request, Response } from 'express';
import { verifyToken } from '../helpers/jwt.helper';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}
export const protectMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = verifyToken(token);
    req.user = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ message: 'Unauthorized' });
  }
};
