'use server';

import apiError from '@/src/common/utils/apiError';
import FetchApi from '@/src/common/utils/FetchApi';

import { REGISTER } from '@/src/common/api';

interface IRegister {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirm: string;
}

interface IRegisterResponse {
  email: string;
  password: string;
}

export default async function userRegister({
  name,
  phone,
  email,
  password,
  confirm,
}: IRegister) {
  try {
    const { url } = REGISTER();
    const data = await FetchApi.post<IRegisterResponse>(url, {
      body: { name, phone, email, password, confirm },
    });

    return { data, ok: true, error: '' };
  } catch (error) {
    return apiError(error);
  }
}
