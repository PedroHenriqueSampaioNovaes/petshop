import { Request, Response } from 'express';

import { UpdateUserService } from '../../services/user/UpdateUserService.js';

import { userOptionalPasswordSchema } from '../../schemas/user.js';

export class UpdateUserController {
  static async handle(req: Request, res: Response) {
    const userData = userOptionalPasswordSchema.parse(req.body);

    const userDataUpdated = await UpdateUserService.execute({
      userId: req.user_id,
      ...userData,
    });

    return res.json(userDataUpdated);
  }
}
