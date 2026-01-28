'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

import { DELETE_PET } from '@/src/common/api';

interface IPetDelete {
  id: string;
}

export default async function petDelete({ id }: IPetDelete) {
  try {
    const token = (await cookies()).get('token')?.value;

    const tag = await cacheTagByUserId('get-mypet');
    const tag2 = await cacheTagByUserId('get-pets');

    const { url } = DELETE_PET({ id });
    const data = await FetchApi.delete(url, { token });

    updateTag(tag);
    updateTag(tag2);

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
