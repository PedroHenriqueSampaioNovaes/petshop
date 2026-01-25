'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';

import { cookies } from 'next/headers';

import { USER_GET } from '@/src/common/api';

import { IUser } from '@/src/common/@types/user';

import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

export default async function userGet() {
  try {
    const { url } = USER_GET();

    const tag = await cacheTagByUserId('update-profile');

    const token = (await cookies()).get('token')?.value;
    const data = await FetchApi.get<IUser>(url, {
      token,
      cache: 'force-cache',
      next: {
        tags: [tag],
      },
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
