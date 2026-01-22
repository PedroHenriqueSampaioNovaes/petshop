'use server';

import { cookies } from 'next/headers';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';

import { IUser } from '@/src/common/@types/user';

import { USER_UPDATE } from '@/src/common/api';

interface IUserUpdateResponse {
  userUpdated: IUser;
  message: string;
}

export default async function userUpdate(formData: FormData) {
  try {
    const token = (await cookies()).get('token')?.value;
    const { url } = USER_UPDATE();
    const data = await FetchApi.patch<IUserUpdateResponse>(url, {
      body: formData,
      token,
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
