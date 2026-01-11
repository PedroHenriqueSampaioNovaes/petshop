import { Request, Response } from 'express';

import { CreateUserService } from '../../services/user/CreateUserService.js';

import { userSchema } from '../../schemas/user.js';

export class CreateUserController {
  static async handle(req: Request, res: Response) {
    const userData = userSchema.parse(req.body);

    const user = await CreateUserService.execute(userData);

    return res.status(201).json({ email: user.email, password: user.password });
  }
}
