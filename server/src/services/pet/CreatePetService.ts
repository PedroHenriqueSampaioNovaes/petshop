import Pet from '../../models/Pet.js';
import User from '../../models/User.js';

import ApiError from '../../utils/ApiError.js';

import { IPetMulterDataRequest } from '../../@types/pet.js';
import uploadImageToCloudinary from '../../utils/uploadImageToCloudinary.js';

interface CreatePetData extends IPetMulterDataRequest {
  userId: string;
}

export class CreatePetService {
  static async execute({
    userId,
    name,
    age,
    weight,
    images,
    description,
    breed,
    gender,
    castrationStatus,
    state,
    municipality,
  }: CreatePetData) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('Usuário não encontrado!', 401);

    // upload pet images on the cloudinary
    const uploads = images.map((image) => {
      return uploadImageToCloudinary(image, 'pets');
    });

    const imagesData: { url: string; public_id: string }[] = [];
    const uploadedImages = await Promise.all(uploads);
    uploadedImages.forEach((result) => {
      imagesData.push({
        url: result.secure_url,
        public_id: result.public_id,
      });
    });

    const pet = new Pet({
      name,
      age,
      weight,
      breed,
      gender,
      castrationStatus,
      location: {
        state,
        municipality,
      },
      description,
      available: true,
      images: imagesData,
      user: {
        _id: user._id,
        name: user.name,
        image: user.image,
        phone: user.phone,
      },
    });

    try {
      const newPet = await pet.save();
      const { createdAt, updatedAt, __v, ...petData } = newPet.toObject();
      return petData;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
