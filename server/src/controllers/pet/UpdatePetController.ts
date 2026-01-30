import { Request, Response } from 'express';
import z from 'zod';

import {
  createPetSchema,
  petMulterImagesSchemaPartial,
} from '../../schemas/pet.js';

import { UpdatePetService } from '../../services/pet/UpdatePetService.js';

export class UpdatePetController {
  static async handle(req: Request, res: Response) {
    const petId = z.string('O ID do pet é obrigatório').parse(req.params.id);
    const petData = createPetSchema.parse(req.body);
    const images = petMulterImagesSchemaPartial.parse(req.files);

    const result = await UpdatePetService.execute({
      petId,
      userId: req.user_id,
      ...petData,
      images,
    });

    return res.json(result);
  }
}
