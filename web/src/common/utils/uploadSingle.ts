import { ISignature, IUploadedFile, IUploadFolder } from '../@types/upload';

import { createUploadSignature } from './createUploadSignature';

export async function uploadSingle(
  file: File,
  folder: IUploadFolder,
  signature?: ISignature,
) {
  try {
    const signData = signature || (await createUploadSignature(folder));

    const formData = new FormData();

    formData.append('file', file);
    formData.append('api_key', signData.apiKey);
    formData.append('timestamp', JSON.stringify(signData.timestamp));
    formData.append('signature', signData.signature);
    formData.append('folder', signData.folder);
    formData.append('transformation', signData.transformation);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${signData.cloudName}/image/upload`,
      {
        method: 'POST',
        body: formData,
      },
    );

    return res.json() as Promise<IUploadedFile>;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(error as string);
  }
}
