import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

type FolderType = 'pets' | 'users';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileFilter = (
  req: any,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  const imageMimetypes = ['image/jpeg', 'image/png', 'image/webp'];

  if (imageMimetypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Apenas imagens jpeg, png e webp são permitidas!'));
  }
};

const createUploadImage = (folderType: FolderType) => {
  const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: `petshop-portfolio/${folderType}`,
        allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
        transformation: [
          {
            width: 1000,
            height: 1000,
            crop: 'limit',
            quality: 85,
          },
        ],
      };
    },
  });

  return multer({
    storage: storage,
    limits: {
      fileSize: 5 * 1024 * 1024,
    },
    fileFilter: fileFilter,
  });
};

export { createUploadImage };
