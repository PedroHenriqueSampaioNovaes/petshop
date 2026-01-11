import { Request, Response } from 'express';

import { AllUserAdoptionsPetService } from '../../services/pet/AllUserAdoptionsPetService.js';

export class AllUserAdoptionsPetController {
  static async handle(req: Request, res: Response) {
    const pet = await AllUserAdoptionsPetService.execute({
      userId: req.user_id,
    });

    return res.json(pet);
  }
}
