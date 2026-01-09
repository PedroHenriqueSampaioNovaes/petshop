import Pet from '../../models/Pet.js';

import ApiError from '../../utils/ApiError.js';

interface GetPetData {
  petId: string;
}

export class GetPetService {
  static async execute({ petId }: GetPetData) {
    const pet = await Pet.findById(petId);
    if (!pet) throw new ApiError('Pet não encontrado.', 404);

    return pet;
  }
}
