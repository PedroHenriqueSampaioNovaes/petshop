import { Request, Response } from 'express';

import { petSchema } from '../../schemas/pet.js';

import { CreatePetService } from '../../services/pet/CreatePetService.js';

export class CreatePetController {
  static async handle(req: Request, res: Response) {
    const petData = petSchema.parse(req.body);

    const newPet = await CreatePetService.execute({
      userId: req.user_id,
      ...petData,
    });

    return res.status(201).json(newPet);
  }
}
