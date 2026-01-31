'use server';

import { cookies } from 'next/headers';
import { updateTag } from 'next/cache';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

import { PET_SCHEDULE } from '@/src/common/api';

interface IPetScheduleResponse {
  message: string;
}

export default async function petSchedule({ id }: { id: string }) {
  try {
    const tag = await cacheTagByUserId('get-adoptions');

    const token = (await cookies()).get('token')?.value;

    const { url } = PET_SCHEDULE({ id });
    const data = await FetchApi.patch<IPetScheduleResponse>(url, {
      token,
    });

    updateTag(tag);

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
