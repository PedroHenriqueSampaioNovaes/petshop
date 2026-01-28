'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

import { cookies } from 'next/headers';

import { IPet } from '@/src/common/@types/pets';

import { GET_MYPETS } from '@/src/common/api';

export default async function myPetsGet() {
  try {
    const token = (await cookies()).get('token')?.value;

    const tag = await cacheTagByUserId('get-mypet');

    const { url } = GET_MYPETS();
    const data = await FetchApi.get<IPet[]>(url, {
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
