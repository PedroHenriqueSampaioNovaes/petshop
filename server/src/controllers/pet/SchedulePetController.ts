import { Request, Response } from 'express';
import z from 'zod';

import { SchedulePetService } from '../../services/pet/SchedulePetService.js';

export class SchedulePetController {
  static async handle(req: Request, res: Response) {
    const petId = z.string('O ID do pet é obrigatório').parse(req.params.id);

    const schedule = await SchedulePetService.execute({
      petId,
      userId: req.user_id,
    });

    return res.json(schedule);
  }
}
