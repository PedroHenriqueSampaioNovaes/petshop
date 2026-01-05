import { Request, Response } from 'express';
import z from 'zod';

import { LoginUserService } from '../../services/user/LoginUserService.js';

export class LoginUserController {
  static async handle(req: Request, res: Response) {
    const userData = z
      .object({
        email: z.email('Insira um e-mail válido.'),
        password: z.string(),
      })
      .parse(req.body);

    const { user, token } = await LoginUserService.execute(userData);

    return res.json({ user, token });
  }
}
