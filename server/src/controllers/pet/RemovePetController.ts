import { Request, Response } from 'express';
import z from 'zod';

import { RemovePetService } from '../../services/pet/RemovePetService.js';

export class RemovePetController {
  static async handle(req: Request, res: Response) {
    const petId = z.string('O ID do pet é obrigatório').parse(req.params.id);

    const result = await RemovePetService.execute({
      petId,
      userId: req.user_id,
    });

    return res.json(result);
  }
}
