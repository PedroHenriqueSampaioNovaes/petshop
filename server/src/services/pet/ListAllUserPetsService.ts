import Pet from '../../models/Pet.js';
import User from '../../models/User.js';

import ApiError from '../../utils/ApiError.js';

interface ListAllData {
  userId: string;
}

export class ListAllUserPetsService {
  static async execute({ userId }: ListAllData) {
    try {
      const user = await User.findById(userId);
      if (!user) throw new ApiError('Usuário não encontrado.', 404);

      const pets = await Pet.find({ 'user._id': user._id }).sort('-createdAt');

      return pets;
    } catch (err) {
      throw new Error(err as string);
    }
  }
}
