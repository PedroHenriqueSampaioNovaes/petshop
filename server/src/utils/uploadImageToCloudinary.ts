import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { Readable } from 'node:stream';

import { MulterMemoryFile } from '../@types/image.js';

export default function uploadImageToCloudinary(
  file: MulterMemoryFile,
  folder: string
): Promise<UploadApiResponse> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: `petshop-portfolio/${folder}`,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result!);
      }
    );

    Readable.from(file.buffer).pipe(uploadStream);
  });
}
