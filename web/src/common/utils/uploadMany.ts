import { IUploadFolder } from '../@types/upload';

import { uploadSingle } from './uploadSingle';
import { createUploadSignature } from './createUploadSignature';

export async function uploadMany(files: FileList, folder: IUploadFolder) {
  const fileList = Array.from(files);

  const signData = await createUploadSignature(folder);

  const results = await Promise.all(
    fileList.map((file) => uploadSingle(file, folder, signData)),
  );

  return results;
}
