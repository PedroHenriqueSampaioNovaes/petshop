import { NextFunction, Request, Response } from 'express';
import z, { ZodError } from 'zod';
import { MulterError } from 'multer';

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

  if (err instanceof ZodError) {
    res.status(422).json({
      ok: false,
      message: z.flattenError(err).formErrors[0] || '',
      fields: z.flattenError(err).fieldErrors,
    });
    return;
  }

  if (err instanceof MulterError) {
    res.status(500).json({
      ok: false,
      error:
        'Ocorreu um erro ao processar a imagem. Certifique-se de ter enviado a quantidade permitida de imagem',
      fields: [err.field],
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
