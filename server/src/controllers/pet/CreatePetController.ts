import { Request, Response } from 'express';

import { createPetSchema, petImagesSchema } from '../../schemas/pet.js';

import { CreatePetService } from '../../services/pet/CreatePetService.js';

export class CreatePetController {
  static async handle(req: Request, res: Response) {
    const petData = createPetSchema.parse(req.body);
    const images = petImagesSchema.parse(req.files);

    const newPet = await CreatePetService.execute({
      userId: req.user_id,
      ...petData,
      images,
    });

    return res.status(201).json(newPet);
  }
}
