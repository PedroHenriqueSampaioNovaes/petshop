'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import { PET_CREATE } from '@/src/common/api';

import FetchApi from '@/src/common/utils/FetchApi';
import apiError from '@/src/common/utils/apiError';
import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

import { IPet } from '@/src/common/@types/pets';

export default async function petCreate(formData: FormData) {
  try {
    const token = (await cookies()).get('token')?.value;

    const { url } = PET_CREATE();
    const data = await FetchApi.post<IPet>(url, {
      body: formData,
      token,
    });

    const tag = await cacheTagByUserId('get-mypet');

    updateTag(tag);
    updateTag('get-pets');

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
