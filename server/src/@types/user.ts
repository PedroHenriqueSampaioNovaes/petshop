import z from 'zod';

import { userSchema } from '../schemas/user.js';

export type IUserData = z.infer<typeof userSchema>;
