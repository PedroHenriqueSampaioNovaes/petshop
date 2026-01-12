import { Request, Response } from 'express';

import { DetailUserService } from '../../services/user/DetailUserService.js';

export class DetailUserController {
  static async handle(req: Request, res: Response) {
    const user = await DetailUserService.execute({ userId: req.user_id });

    return res.json(user);
  }
}
