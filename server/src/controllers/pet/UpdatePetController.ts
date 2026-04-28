import { Request, Response } from 'express';
import z from 'zod';

import { petUpdateSchema } from '../../schemas/pet.js';

import { UpdatePetService } from '../../services/pet/UpdatePetService.js';

export class UpdatePetController {
  static async handle(req: Request, res: Response) {
    const petId = z.string('O ID do pet é obrigatório').parse(req.params.id);
    const petData = petUpdateSchema.parse({ ...req.body, images: req.files });

    const result = await UpdatePetService.execute({
      petId,
      userId: req.user_id,
      ...petData,
    });

    return res.json(result);
  }
}
