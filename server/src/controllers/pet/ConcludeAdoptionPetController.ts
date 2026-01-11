import { Request, Response } from 'express';
import z from 'zod';

import { ConcludeAdoptionPetService } from '../../services/pet/ConcludeAdoptionPetService.js';

export class ConcludeAdoptionPetController {
  static async handle(req: Request, res: Response) {
    const petId = z.string('O ID do pet é obrigatório').parse(req.params.id);

    const adoptionConclude = await ConcludeAdoptionPetService.execute({
      petId,
      userId: req.user_id,
    });

    return res.json(adoptionConclude);
  }
}
