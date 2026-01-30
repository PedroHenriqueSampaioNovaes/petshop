import z from 'zod';

export const petFormSchema = z.object({
  images: z
    .custom<FileList>((list) => list instanceof FileList, 'Imagem obrigatória')
    .refine((list) => list.length === 4, 'Selecione quatro imagens')
    .refine((files) => {
      for (const file of files) {
        if (file.size > 5 * 1024 * 1024) {
          return false;
        }
      }
      return true;
    }, 'O arquivo deve ter no máximo 5MB'),
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

export const petFormSchemaPartial = petFormSchema
  .omit({ images: true })
  .extend({
    images: z.refine<FileList>(
      (list) => list.length === 0 || list.length === 4,
      'Selecione quatro imagens',
    ),
  });

export type PetFormSchema = z.infer<typeof petFormSchema>;
export type PetFormSchemaPartial = z.infer<typeof petFormSchemaPartial>;
