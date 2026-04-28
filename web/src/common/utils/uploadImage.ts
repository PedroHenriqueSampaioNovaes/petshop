import { Readable } from 'node:stream';

import cloudinary from '@/src/lib/cloudinary';

interface CloudinaryImage {
  url: string;
  public_id: string;
}

const folderPathBase = 'petshop-portfolio';

export default async function uploadImage(
  file: File,
  folder: 'pets' | 'users',
): Promise<CloudinaryImage> {
  const MAX_FILE_SIZE = 10 * 1024 * 1024;

  if (file.size > MAX_FILE_SIZE) {
    throw new Error(`A imagem ultrapassa o limite máximo de 10MB permitidos.`);
  }

  const folderPath = `${folderPathBase}/${folder}`;

  const imageHeight = folder === 'users' ? 300 : 720;
  const imageWidth = folder === 'users' ? 300 : 600;

  return new Promise(async (resolve, reject) => {
    const buffer = Buffer.from(await file.arrayBuffer());

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: folderPath,
        transformation: {
          width: imageWidth,
          height: imageHeight,
          crop: 'fit',
          quality: 'auto',
        },
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({
          url: result!.secure_url,
          public_id: result!.public_id,
        });
      },
    );

    Readable.from(buffer).pipe(uploadStream);
  });
}
