import z from 'zod';

export const profileSchema = z
  .object({
    image: z
      .any() // Use z.any() to handle FileList safely (avoids SSR issues with instanceof FileList)
      .refine((files) => {
        return !files || files.length === 0 || files[0].size <= 5 * 1024 * 1024; // 5MB limit
      }, 'O arquivo deve ter no máximo 5MB')
      .refine((files) => {
        return (
          !files ||
          files.length === 0 ||
          ['image/jpeg', 'image/png', 'image/webp'].includes(files[0].type)
        );
      }, 'Formato inválido (apenas .jpg, .png ou .webp)')
      .transform((files) => files?.[0] || null),
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
