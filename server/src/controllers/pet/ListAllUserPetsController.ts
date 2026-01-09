import { Request, Response } from 'express';

import { ListAllUserPetsService } from '../../services/pet/ListAllUserPetsService.js';

export class ListAllUserPetsController {
  static async handle(req: Request, res: Response) {
    const userPets = await ListAllUserPetsService.execute({
      userId: req.user_id,
    });

    return res.json(userPets);
  }
}
