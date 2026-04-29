import { ISignature, IUploadFolder } from '../@types/upload';

import getToken from '@/app/actions/get-token';

import FetchApi from './FetchApi';
import { SIGNATURE_GET } from '../api';

export async function createUploadSignature(folder: IUploadFolder) {
  const token = await getToken();

  const { url } = SIGNATURE_GET(folder);

  return await FetchApi.post<ISignature>(url, {
    token,
  });
}
