import cloudinary from '../../lib/cloudinary.js';

interface AdoptionsPetData {
  folder: 'pets' | 'users';
}

export class GenerateSignatureImageService {
  static async execute({ folder }: AdoptionsPetData) {
    const folderPath = `petshop-portfolio/${folder}`;

    const timestamp = Math.floor(Date.now() / 1000);

    const paramsToSign = {
      timestamp,
      folder: folderPath,
      transformation: 'h_600,w_720,c_limit,q_auto',
    };

    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET!,
    );

    return {
      signature,
      cloudName: process.env.CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
      ...paramsToSign,
    };
  }
}
