import z from 'zod';

import { multerImageDataSchema } from './multer.js';

export const createPetSchema = z.object({
  name: z.string().min(2),
  age: z.coerce.number().min(0),
  weight: z.coerce.number(),
  description: z
    .string()
    .min(40, 'A descrição deve ter no mínimo 40 caracteres')
    .max(300, 'A descrição deve ter no máximo 300 caracteres'),
  breed: z.string(),
  gender: z.enum(['male', 'female']),
  castrationStatus: z
    .enum(['true', 'false'], {
      message: 'castrationStatus deve ser "true" ou "false"',
    })
    .transform((val) => val === 'true'),
  state: z.string('O estado é obrigatório'),
  municipality: z.string('O município é obrigatório'),
});

export const petMulterImagesSchema = z
  .array(multerImageDataSchema)
  .min(4, 'É necessário enviar 4 imagens do pet')
  .max(4, 'É necessário enviar 4 imagens do pet');

export const listPetSchema = z.object({
  petsPerPage: z.coerce
    .number('É obrigatório enviar a quantidade de pets por página')
    .default(8),
  nextCursor: z.preprocess(
    (val) => (val === 'null' ? null : val),
    z.coerce
      .date(
        'A data tem que estar no formato de ISO em string. Converta a ISO para string com .toISOString()',
      )
      .nullable(),
  ),
});
