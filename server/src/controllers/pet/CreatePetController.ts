import { Request, Response } from 'express';

import { petSchema } from '../../schemas/pet.js';

import { CreatePetService } from '../../services/pet/CreatePetService.js';

export class CreatePetController {
  static async handle(req: Request, res: Response) {
    console.log(req.body)
    const petData = petSchema.parse(req.body);
    console.log('paassoouu')

    const newPet = await CreatePetService.execute({
      userId: req.user_id,
      ...petData,
    });

    return res.status(201).json(newPet);
  }
}
