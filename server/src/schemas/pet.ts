import z from 'zod';

import { MulterImageData } from '../@types/image.js';

export const createPetSchema = z.object({
  name: z.string().min(2),
  age: z.coerce.number().min(0),
  weight: z.coerce.number(),
  description: z.string(),
  breed: z.string(),
  gender: z.string(),
  castrationStatus: z
    .enum(['true', 'false'], {
      message: 'castrationStatus deve ser "true" ou "false"',
    })
    .transform((val) => val === 'true'),
  location: z.string().transform((str, ctx) => {
    try {
      const parsed = JSON.parse(str);
      return z
        .object({ state: z.string(), municipality: z.string() })
        .parse(parsed);
    } catch (error) {
      ctx.addIssue({
        code: 'custom',
        message:
          'Location deve ser uma string JSON válida com state e municipality',
      });
      return z.NEVER;
    }
  }),
});

export const multerImageDataSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  path: z.string(),
  size: z.number(),
  filename: z.string(),
}) satisfies z.ZodType<MulterImageData>;

export const petImagesSchema = z
  .array(multerImageDataSchema)
  .min(1, 'É necessário enviar pelo menos 1 imagem do pet');

export const listPetSchema = z.object({
  petsPerPage: z.coerce
    .number('É obrigatório enviar a quantidade de pets por página')
    .default(8),
  currentCursor: z.coerce
    .date(
      'A data tem que estar no formato de ISO em string. Converta a ISO pra string com .toISOString()'
    )
    .nullable()
    .optional(),
});
