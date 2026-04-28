import z from 'zod';

const MAX_SIZE_IN_MB = 8;
const MAX_SIZE_IN_BYTES = MAX_SIZE_IN_MB * 1024 * 1024;

export const profileSchema = z
  .object({
    image: z
      .custom<FileList>()
      .refine(
        (files) => files && (files.length === 0 || files.length === 1),
        'Selecione somente 1 imagem',
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
    name: z.string('Insira um nome').min(2, 'Mínimo de 2 caracteres'),
    phone: z
      .string('Insira um telefone para contato')
      .regex(/^\d{2}\s\d{5}\-\d{4}$/, 'Telefone inválido'),
    email: z.email('E-mail inválido'),
    password: z
      .string()
      .refine((val) => !val || val.length >= 6, 'Mínimo de 6 caracteres')
      .optional(),
    confirm: z.string('Insira a confirmação de senha').optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas não coincidem',
    path: ['confirm'],
  });
