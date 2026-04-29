import { z } from 'zod';
import { Request, Response } from 'express';

import { GenerateSignatureImageService } from '../../services/image/GenerateSignatureImageService.js';

export class GenerateSignatureImageController {
  static async handle(req: Request, res: Response) {
    const folder = z.enum(['users', 'pets']).parse(req.params.folder);

    const signature = await GenerateSignatureImageService.execute({
      folder,
    });

    return res.json(signature);
  }
}
