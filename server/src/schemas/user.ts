import z from 'zod';

export const userSchema = z
  .object({
    name: z.string().min(2),
    email: z.email('Insira um e-mail válido.'),
    phone: z.string(),
    password: z.string().min(6),
    confirm: z.string().min(6),
  })
  .refine((data) => data.password === data.confirm, {
    message: 'As senhas devem ser iguais.',
    path: ['confirm'],
  });
