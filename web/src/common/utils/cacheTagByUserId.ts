import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';

export async function cacheTagByUserId(tag: string) {
  const token = (await cookies()).get('token')?.value;

  if (!token) throw new Error('Token não encontrado');

  try {
    const { _id } = decodeJwt<{ _id: string }>(token);

    return `${tag}:${_id}`;
  } catch {
    throw new Error('Token inválido');
  }
}
