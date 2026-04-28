import { UploadApiResponse } from 'cloudinary';
import { Readable } from 'node:stream';

import cloudinary from '../lib/cloudinary.js';

import { MulterMemoryFile } from '../@types/multer.js';

export default function uploadImage(
  file: MulterMemoryFile,
  folder: 'pets' | 'users',
): Promise<UploadApiResponse> {
  const imageHeight = folder === 'users' ? 300 : 720;
  const imageWidth = folder === 'users' ? 300 : 600;

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `petshop-portfolio/${folder}`,
        transformation: {
          width: imageWidth,
          height: imageHeight,
          crop: 'fit',
          quality: 'auto',
        },
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!);
      },
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
}
