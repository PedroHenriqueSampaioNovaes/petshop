import { v2 as cloudinary } from 'cloudinary';

import Pet from '../../models/Pet.js';

import ApiError from '../../utils/ApiError.js';

interface RemovePetData {
  petId: string;
  userId: string;
}

export class RemovePetService {
  static async execute({ petId, userId }: RemovePetData) {
    const pet = await Pet.findById(petId);
    if (!pet) throw new ApiError('Pet não encontrado.', 404);

    if (pet.user._id.toString() !== userId) {
      throw new ApiError('Você não tem permissão para remover este pet.', 403);
    }

    // remove images of the cloudinary
    if (pet.images && pet.images.length > 0) {
      try {
        const publicIds = pet.images.map((image) => image.public_id as string);

        if (publicIds.length > 0) {
          await cloudinary.api.delete_resources(publicIds);
        }
      } catch (err) {
        throw new ApiError('Erro ao tentar deletar as imagens da núvem.', 400);
      }
    }

    try {
      await Pet.findByIdAndDelete(petId);
      return { message: 'Pet removido com sucesso.' };
    } catch (err) {
      throw new ApiError('Erro ao remover pet.', 500);
    }
  }
}
