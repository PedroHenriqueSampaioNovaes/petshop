import Pet from '../../models/Pet.js';
import User from '../../models/User.js';

import ApiError from '../../utils/ApiError.js';

interface SchedulePetData {
  petId: string;
  userId: string;
}

export class SchedulePetService {
  static async execute({ userId, petId }: SchedulePetData) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('Usuário não encontrado.', 404);

    const pet = await Pet.findById(petId);
    if (!pet) throw new ApiError('Pet não encontrado.', 404);

    if (pet.user._id.equals(user._id)) {
      throw new ApiError(
        'Você não pode agendar uma visita com o seu próprio Pet!',
        422
      );
    }

    // check if user has already scheduled a visit
    if (pet.adopter && pet.adopter._id.equals(user._id)) {
      return new ApiError('Você já agendou uma visita para esse Pet!', 422);
    }

    // add user to pet
    pet.adopter = {
      _id: user._id,
      name: user.name,
      image: { url: user.image.url, public_id: user.image.public_id },
    };

    try {
      await Pet.findByIdAndUpdate(pet._id, pet);
      return {
        message: `A visita foi agendada com sucesso. Entre em contato com o ${pet.user.name} pelo telefone ${pet.user.phone}`,
      };
    } catch (err) {
      throw new ApiError('Erro ao agendar visita com o pet.', 500);
    }
  }
}
