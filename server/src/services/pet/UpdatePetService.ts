import cloudinary from '../../lib/cloudinary.js';

import Pet from '../../models/Pet.js';

import { IUpdatePetData } from '../../@types/pet.js';

import ApiError from '../../utils/ApiError.js';

interface UpdatePetData extends IUpdatePetData {
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

    if (images?.length) {
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

      pet.images = [];
      images.forEach((result) => {
        pet.images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      });
    }

    pet.name = name;
    pet.age = age;
    pet.weight = weight;
    pet.gender = gender;
    pet.breed = breed;
    pet.description = description;
    pet.castrationStatus = castrationStatus;
    pet.location.municipality = municipality;
    pet.location.state = state;

    try {
      await Pet.findByIdAndUpdate(pet._id, { $set: pet });
      return { message: 'Pet atualizado com sucesso.' };
    } catch (err) {
      throw new ApiError('Erro ao atualizar o pet.', 500);
    }
  }
}
