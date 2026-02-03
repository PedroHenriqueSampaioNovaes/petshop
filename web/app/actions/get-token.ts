'use server';

import { cookies } from 'next/headers';

export default async function getToken() {
  const token = (await cookies()).get('token')?.value;
  return token;
}
