import { Request, Response } from 'express';

import { CreateUserService } from '../../services/user/CreateUserService.js';

export class CreateUserController {
  static async handle(req: Request, res: Response) {
    const user = await CreateUserService.execute();

    return res.json(user);
  }
}
