import Pet from '../../models/Pet.js';
import User from '../../models/User.js';

import ApiError from '../../utils/ApiError.js';

interface ConcludePetAdoptionData {
  petId: string;
  userId: string;
}

export class ConcludeAdoptionPetService {
  static async execute({ userId, petId }: ConcludePetAdoptionData) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('Usuário não encontrado.', 404);

    const pet = await Pet.findOne({ _id: petId });
    if (!pet) throw new ApiError('Pet não encontrado.', 404);

    if (pet.user._id.toString() !== user._id.toString()) {
      return new ApiError(
        'Houve um problema em processar a sua solicitação, tente novamente mais tarde!',
        422
      );
    }

    pet.available = false;

    try {
      await Pet.findByIdAndUpdate(petId, pet);

      return {
        message: 'Parabéns! O ciclo de adoção foi finalizado com sucesso!',
      };
    } catch (err) {
      throw new ApiError('Erro ao concluir a adoção do pet.', 500);
    }
  }
}
