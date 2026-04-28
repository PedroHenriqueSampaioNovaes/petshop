'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';
import uploadImage from '@/src/common/utils/uploadImage';

import { USER_UPDATE } from '@/src/common/api';

import getToken from './get-token';

export default async function userUpdate(formData: FormData) {
  try {
    const imageFile = formData.get('image') as File;

    const userData = formData.entries().reduce(
      (acc, [key, value]) => {
        if (key === 'image') return acc;
        acc[key] = value;
        return acc;
      },
      {} as Record<string, unknown>,
    );

    if (imageFile) {
      userData.image = await uploadImage(imageFile, 'users');
    }

    const token = await getToken();

    const { url } = USER_UPDATE();
    const data = await FetchApi.patch(url, {
      body: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
      token,
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
