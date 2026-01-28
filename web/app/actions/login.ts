'use server';

import { cookies } from 'next/headers';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';

import { IUser } from '@/src/common/@types/user';

import { LOGIN } from '@/src/common/api';

interface ILogin {
  email: string;
  password: string;
}

interface ILoginResponse {
  user: Pick<IUser, 'name' | 'email' | 'image'>;
  token: string;
}

export default async function login({ email, password }: ILogin) {
  try {
    const { url } = LOGIN();
    const data = await FetchApi.post<ILoginResponse>(url, {
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    (await cookies()).set('token', data.token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
