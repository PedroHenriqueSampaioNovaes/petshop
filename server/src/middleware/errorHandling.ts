import { NextFunction, Request, Response } from 'express';

import ApiError from '../utils/ApiError.js';

export default function errorHandling(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    res.status(err.error).json({ ok: false, message: err.message });
    return;
  }

  if (err instanceof Error) {
    res.status(500).json({ ok: false, error: err.message });
    return;
  }

  res
    .status(500)
    .json({ ok: false, message: 'Ocorreu um erro com o servidor.' });
}
