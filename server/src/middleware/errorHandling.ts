import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';

import ApiError from '../utils/ApiError.js';

export default function errorHandling(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (err instanceof ApiError) {
    res.status(err.error).json({ ok: false, message: err.message });
    return;
  }

  if (err instanceof ZodError) {
    res.status(422).json({
      ok: false,
      message:
        z.flattenError(err).formErrors[0] ||
        'Ocorreu um erro ao validar os dados.',
      fields: z.flattenError(err).fieldErrors,
    });
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
