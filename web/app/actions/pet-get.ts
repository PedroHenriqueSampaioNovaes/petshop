'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';

import { IPet } from '@/src/common/@types/pets';

import { GET_PET } from '@/src/common/api';

interface IPetGet {
  id: string;
}

export default async function petGet({ id }: IPetGet) {
  try {
    const { url } = GET_PET({ id });
    const data = await FetchApi.get<IPet>(url);

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
