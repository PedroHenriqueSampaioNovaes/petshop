import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

import ApiError from '../utils/ApiError.js';

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) throw new ApiError('Token inválido.', 400);

  const token = authorization.split(' ')[1];

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET as string) as {
      email: string;
      _id: string;
    };
    req.user_id = data._id;

    next();
  } catch (error) {
    throw new ApiError('Token inválido.', 400);
  }
}
