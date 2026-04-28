'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import uploadImage from '@/src/common/utils/uploadImage';

import { PET_CREATE } from '@/src/common/api';

import getToken from './get-token';
import removeCacheTag from './remove-cache-tag';

export default async function petCreate(formData: FormData) {
  try {
    const imageFiles = formData.getAll('images') as File[];

    if (imageFiles.length !== 4) {
      return {
        data: null,
        ok: false,
        error: 'É necessário enviar 4 imagens do pet',
      };
    }

    const petData = formData.entries().reduce(
      (acc, [key, value]) => {
        if (key === 'images') return acc;
        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>,
    );

    const uploadPromises = imageFiles.map((file) => uploadImage(file, 'pets'));
    petData.images = await Promise.all(uploadPromises);

    const token = await getToken();

    const { url } = PET_CREATE();
    const data = await FetchApi.post(url, {
      body: JSON.stringify(petData),
      headers: {
        'Content-Type': 'application/json',
      },
      token,
    });

    await removeCacheTag('get-mypet', true);
    await removeCacheTag('get-pets');

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
