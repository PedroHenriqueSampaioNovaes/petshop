import { Request, Response } from 'express';

import { UpdateUserService } from '../../services/user/UpdateUserService.js';

import { userBaseSchema } from '../../schemas/user.js';
import { multerImageDataSchema } from '../../schemas/multer.js';

export class UpdateUserController {
  static async handle(req: Request, res: Response) {
    const userData = userBaseSchema
      .partial({ password: true, confirm: true })
      .parse(req.body);
    const image = multerImageDataSchema.optional().parse(req.file);

    const userDataUpdated = await UpdateUserService.execute({
      userId: req.user_id,
      ...userData,
      image,
    });

    return res.json(userDataUpdated);
  }
}
