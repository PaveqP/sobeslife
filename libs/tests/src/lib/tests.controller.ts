import { getQuestionsBySpecializationAndLevel } from '@sobes-life-server/data-access';
import { NextFunction, Request, Response } from 'express';

export function tests(): string {
  return 'tests';
}

console.log('test');

export const getTestByParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { specialization, level } = req.params;
    if (!specialization || !level) {
      return res.status(400).json({ message: 'Missing required parameters' });
    }
    const response = await getQuestionsBySpecializationAndLevel(
      String(specialization),
      String(level)
    );
    return res.status(200).json(response);
  } catch (error) {
    console.error(error);
    next(error);
    return error;
  }
};
