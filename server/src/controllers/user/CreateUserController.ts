import { Request, Response } from 'express';
import z from 'zod';

import { CreateUserService } from '../../services/user/CreateUserService.js';

export class CreateUserController {
  static async handle(req: Request, res: Response) {
    const userData = z
      .object({
        name: z.string().min(3),
        email: z.email('Insira um e-mail válido.'),
        phone: z.string(),
        password: z.string(),
        confirm: z.string(),
      })
      .refine((data) => data.password === data.confirm, {
        message: 'As senhas devem ser iguais.',
        path: ['confirmpassword'],
      })
      .parse(req.body);

    const user = await CreateUserService.execute(userData);

    return res.status(201).json({ email: user.email, password: user.password });
  }
}
