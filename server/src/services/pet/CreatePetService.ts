import Pet from '../../models/Pet.js';
import User from '../../models/User.js';

import ApiError from '../../utils/ApiError.js';

import { MulterImageData } from '../../@types/image.js';

interface PetData {
  userId: string;
  name: string;
  age: number;
  weight: number;
  images: MulterImageData[];
  description: string;
  breed: string;
  gender: string;
  castrationStatus: boolean;
  location: {
    state: string;
    municipality: string;
  };
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
    location,
  }: PetData) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('Usuário não encontrado!', 401);

    const imagesData = images.map(({ path, filename }) => ({
      url: path,
      public_id: filename,
    }));

    const pet = new Pet({
      name,
      age,
      weight,
      breed,
      gender,
      castrationStatus,
      location,
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
