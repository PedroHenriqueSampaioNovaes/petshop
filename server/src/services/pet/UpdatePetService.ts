import { v2 as cloudinary } from 'cloudinary';

import Pet, { type IPet } from '../../models/Pet.js';

import { IPetMulterDataRequest } from '../../@types/pet.js';

import ApiError from '../../utils/ApiError.js';
import uploadImageToCloudinary from '../../utils/uploadImageToCloudinary.js';

interface UpdatePetData extends IPetMulterDataRequest {
  petId: string;
  userId: string;
}

export class UpdatePetService {
  static async execute({
    userId,
    petId,
    name,
    age,
    weight,
    breed,
    gender,
    castrationStatus,
    description,
    images,
    municipality,
    state,
  }: UpdatePetData) {
    const pet = await Pet.findById(petId);
    if (!pet) throw new ApiError('Pet não encontrado.', 404);

    if (pet.user._id.toString() !== userId) {
      throw new ApiError(
        'Você não tem permissão para atualizar as informações sobre este pet.',
        403,
      );
    }

    // remove images of the cloudinary
    try {
      for (const image of pet.images) {
        await cloudinary.uploader.destroy(image.public_id as string);
      }
    } catch (error) {
      throw new ApiError(
        'Erro ao tentar deletar as imagens do pet na núvem.',
        400,
      );
    }

    // remove pet images of the db
    try {
      await Pet.findByIdAndUpdate(pet._id, {
        $set: {
          images: [],
        },
      });
    } catch (err) {
      throw new ApiError('Erro ao remover as imagens do pet.', 500);
    }

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

    // add pet images in the db
    try {
      await Pet.findByIdAndUpdate(pet._id, {
        $push: {
          images: {
            $each: imagesData,
          },
        },
      });
    } catch (err) {
      throw new ApiError('Erro ao adicionar as imagens do pet.', 500);
    }

    const updatedData: Partial<IPet> = {
      name,
      age,
      weight,
      gender,
      breed,
      description,
      castrationStatus,
      images: imagesData,
      location: {
        municipality,
        state,
      },
    };

    try {
      await Pet.findByIdAndUpdate(pet._id, updatedData);
      return { message: 'Pet atualizado com sucesso.' };
    } catch (err) {
      throw new ApiError('Erro ao atualizar o pet.', 500);
    }
  }
}
