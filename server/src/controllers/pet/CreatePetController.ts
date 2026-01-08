import { Request, Response } from 'express';
import z, { string } from 'zod';

import { MulterImageData } from '../../@types/image.js';

import { CreatePetService } from '../../services/pet/CreatePetService.js';

const multerImageDataSchema = z.object({
  fieldname: z.string(),
  originalname: z.string(),
  encoding: z.string(),
  mimetype: z.string(),
  path: z.string(),
  size: z.number(),
  filename: z.string(),
}) satisfies z.ZodType<MulterImageData>;

export class CreatePetController {
  static async handle(req: Request, res: Response) {
    const petData = z
      .object({
        name: z.string().min(2),
        age: z.coerce.number().min(0),
        weight: z.coerce.number(),
        description: z.string(),
        breed: z.string(),
        gender: z.string(),
        castrationStatus: z
          .enum(['true', 'false'], {
            message: 'castrationStatus deve ser "true" ou "false"',
          })
          .transform((val) => val === 'true'),
        location: z.string().transform((str, ctx) => {
          try {
            const parsed = JSON.parse(str);
            return z
              .object({ state: z.string(), municipality: z.string() })
              .parse(parsed);
          } catch (error) {
            ctx.addIssue({
              code: 'custom',
              message:
                'Location deve ser uma string JSON válida com state e municipality',
            });
            return z.NEVER;
          }
        }),
      })
      .parse(req.body);

    const images = z
      .array(
        multerImageDataSchema,
        'É necessário enviar pelo menos 1 imagem do pet'
      )
      .parse(req.files);

    const newPet = await CreatePetService.execute({
      userId: req.user_id,
      ...petData,
      images,
    });

    return res.status(201).json(newPet);
  }
}
