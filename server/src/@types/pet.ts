import z from 'zod';

import { petSchema, petUpdateSchema } from '../schemas/pet.js';

export type IPetData = z.infer<typeof petSchema>;
export type IUpdatePetData = z.infer<typeof petUpdateSchema>;
