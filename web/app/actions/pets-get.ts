'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';

import { IPet } from '@/src/common/@types/pets';

import { GET_PETS } from '@/src/common/api';

interface IPetsGet {
  nextCursor?: string | null;
  petsPerPage?: number;
}

interface IPetsGetResponse {
  pets: IPet[];
  hasNextPage: boolean;
  nextCursor: string | null;
}

export default async function petsGet({
  petsPerPage = 8,
  nextCursor = null,
}: IPetsGet) {
  try {
    const { url } = GET_PETS({ petsPerPage, nextCursor });
    const data = await FetchApi.get<IPetsGetResponse>(url, {
      next: { revalidate: 60 },
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
