const jwt = require('jsonwebtoken');

export const generateToken = (userId: number): string => {
  return jwt.sign({ id: userId }, process.env['JWT_SECRET'] as string, {
    expiresIn: process.env['JWT_EXPIRES_IN'],
  });
};

export const verifyToken = (token: string): string => {
  return jwt.verify(token, process.env['JWT_SECRET'] as string);
};
