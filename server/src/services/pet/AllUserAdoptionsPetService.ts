import Pet from '../../models/Pet.js';
import User from '../../models/User.js';

import ApiError from '../../utils/ApiError.js';

interface AdoptionsPetData {
  userId: string;
}

export class AllUserAdoptionsPetService {
  static async execute({ userId }: AdoptionsPetData) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('Usuário não encontrado.', 404);

    try {
      const pets = await Pet.find({ 'adopter._id': user._id }).sort(
        '-createdAt'
      );
      return pets;
    } catch (err) {
      throw new ApiError('Erro ao buscar os pets adotados pelo usuário.', 500);
    }
  }
}
