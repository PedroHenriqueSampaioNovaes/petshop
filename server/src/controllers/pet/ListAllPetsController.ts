import { Request, Response } from 'express';

import { listPetSchema } from '../../schemas/pet.js';

import { ListAllPetsService } from '../../services/pet/ListAllPetsService.js';

export class ListAllPetsController {
  static async handle(req: Request, res: Response) {
    const data = listPetSchema.parse(req.query);

    const pagination = await ListAllPetsService.execute(data);

    return res.json(pagination);
  }
}
