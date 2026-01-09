import { Request, Response } from 'express';
import z from 'zod';

import { GetPetService } from '../../services/pet/GetPetService.js';

export class GetPetController {
  static async handle(req: Request, res: Response) {
    const petId = z.string('O ID do pet é obrigatório').parse(req.params.id);

    const pet = await GetPetService.execute({ petId });

    return res.json(pet);
  }
}
