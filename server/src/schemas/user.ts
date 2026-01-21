import z from 'zod';

export const userBaseSchema = z.object({
  name: z.string().min(2, 'Nome precisa ter no mínimo 2 caracteres'),
  email: z.email('Insira um e-mail válido.'),
  phone: z.string(),
  password: z.string().min(6),
  confirm: z.string().min(6),
});

export const userSchema = userBaseSchema.refine(
  (data) => data.password === data.confirm,
  {
    message: 'As senhas devem ser iguais.',
    path: ['confirm'],
  },
);
