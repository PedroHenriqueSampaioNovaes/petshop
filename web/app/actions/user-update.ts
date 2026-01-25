'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

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

    const tag = await cacheTagByUserId('user-data-get');

    if (tag) updateTag(tag);

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
