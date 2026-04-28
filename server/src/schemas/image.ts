import z from 'zod';

import { MulterMemoryFile } from '../@types/multer.js';

const MAX_SIZE_FILE_IN_BYTES = 10 * 1024 * 1024;

export const imageSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  buffer: z.instanceof(Buffer),
  size: z.number().max(MAX_SIZE_FILE_IN_BYTES),
}) satisfies z.ZodType<MulterMemoryFile>;
