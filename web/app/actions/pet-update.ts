'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';

import { PET_UPDATE } from '@/src/common/api';

export default async function petUpdate(formData: FormData, petId: string) {
  try {
    const token = (await cookies()).get('token')?.value;
    const { url } = PET_UPDATE({ id: petId });
    const data = await FetchApi.patch<{ message: string }>(url, {
      body: formData,
      token,
    });

    updateTag('get-pet');

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
