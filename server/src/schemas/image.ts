import z from 'zod';

export const imageUrlSchema = z.object({
  url: z.url('URL da imagem inválida'),
  public_id: z.string().min(1, 'public_id é obrigatório'),
});
