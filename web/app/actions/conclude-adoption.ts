'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

import { CONCLUDE_ADOPTION } from '@/src/common/api';

interface IConcludeAdoptionResponse {
  message: string;
}

export default async function concludeAdoption(id: string) {
  try {
    const tag = await cacheTagByUserId('get-mypet');

    const token = (await cookies()).get('token')?.value;
    const { url } = CONCLUDE_ADOPTION({ id });
    const data = await FetchApi.patch<IConcludeAdoptionResponse>(url, {
      token,
    });

    if (tag) updateTag(tag);
    updateTag('get-pets');

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
