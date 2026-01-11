import z from 'zod';

import { MulterMemoryFile } from '../@types/image.js';

export const multerImageDataSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Buffer),
  size: z.number(),
}) satisfies z.ZodType<MulterMemoryFile>;
