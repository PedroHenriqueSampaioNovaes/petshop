'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

import { cookies } from 'next/headers';

import { USER_ADOPTIONS } from '@/src/common/api';

import { IPet } from '@/src/common/@types/pets';

export default async function userAdoptions() {
  try {
    const { url } = USER_ADOPTIONS();

    const tag = await cacheTagByUserId('get-adoptions');

    const token = (await cookies()).get('token')?.value;
    const data = await FetchApi.get<IPet[]>(url, {
      token,
      next: {
        revalidate: 60,
        tags: [tag],
      },
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
