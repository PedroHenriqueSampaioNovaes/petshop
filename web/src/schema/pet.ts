import z from 'zod';

const MAX_SIZE_IN_MB = 10;
const MAX_SIZE_IN_BYTES = MAX_SIZE_IN_MB * 1024 * 1024;

const imagesSchema = z
  .custom<FileList>((list) => list instanceof FileList, 'Imagem obrigatória')
  .refine((list) => list.length === 4, 'Selecione quatro imagens')
  .refine((files) => {
    for (const file of Array.from(files)) {
      if (file.size > MAX_SIZE_IN_BYTES) {
        return false;
      }
    }
    return true;
  }, `Cada imagem deve ter no máximo ${MAX_SIZE_IN_MB}MB`)
  .refine((files) => {
    for (const file of files) {
      if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
        return false;
      }
    }
    return true;
  }, 'Formato inválido (apenas .jpg, .png ou .webp)');

export const petFormSchema = z.object({
  images: imagesSchema,
  name: z.string().min(1, 'Nome obrigatório'),
  age: z.string().min(1, 'Idade obrigatória'),
  weight: z.string().min(1, 'Peso obrigatório'),
  breed: z.string().min(1, 'Raça é obrigatória'),
  gender: z.string('Selecione um gênero').min(1, 'Selecione um gênero'),
  castrationStatus: z
    .string('Selecione o status de castração')
    .min(1, 'Selecione o status de castração'),
  state: z.string('Selecione um estado').min(1, 'Selecione um estado'),
  municipality: z
    .string('Selecione um município')
    .min(1, 'Selecione um município'),
  description: z.string().min(40, 'Descrição muito curta'),
});

export const petFormSchemaPartial = z.object({
  ...petFormSchema.shape,
  images: z
    .custom<FileList>()
    .refine(
      (files) => files && (files.length === 0 || files.length === 4),
      'Selecione quatro imagens',
    )
    .refine((files) => {
      if (!files) return true;
      for (const file of Array.from(files)) {
        if (file.size > MAX_SIZE_IN_BYTES) {
          return false;
        }
      }
      return true;
    }, `Cada imagem deve ter no máximo ${MAX_SIZE_IN_MB}MB`)
    .refine((files) => {
      if (!files) return true;
      for (const file of Array.from(files)) {
        if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
          return false;
        }
      }
      return true;
    }, 'Formato inválido (apenas .jpg, .png ou .webp)'),
});

export type PetFormSchema = z.infer<typeof petFormSchema>;
export type PetFormSchemaPartial = z.infer<typeof petFormSchemaPartial>;
