import z from 'zod';

import { imageSchema } from './image.js';

export const petImagesSchema = z
  .array(imageSchema)
  .min(4, 'É necessário enviar 4 imagens do pet')
  .max(4, 'É necessário enviar 4 imagens do pet');

export const petSchema = z.object({
  name: z.string().min(2, 'Nome deve ter no mínimo 2 caracteres'),
  age: z.coerce.number().min(1, 'Idade deve ser maior ou igual a 1'),
  weight: z.coerce.number().min(1, 'Peso deve ser maior ou igual a 1'),
  description: z
    .string()
    .min(40, 'A descrição deve ter no mínimo 40 caracteres')
    .max(300, 'A descrição deve ter no máximo 300 caracteres'),
  images: petImagesSchema,
  breed: z.string().min(1, 'Raça do pet é obrigatória'),
  gender: z.enum(['male', 'female'], 'Gênero do pet é obrigatório'),
  castrationStatus: z
    .enum(['true', 'false'], 'Status de castração do pet é obrigatório')
    .transform((val) => val === 'true'),
  state: z.string('O estado é obrigatório').min(1, 'Selecione um estado'),
  municipality: z
    .string('O município é obrigatório')
    .min(1, 'Selecione um município'),
});

export const petUpdateSchema = z.object({
  ...petSchema.shape,
  images: petImagesSchema.optional(),
});

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
