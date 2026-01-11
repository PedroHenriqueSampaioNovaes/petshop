import ApiError from '../../utils/ApiError.js';
import User from '../../models/User.js';

interface UserData {
  userId: string;
}

export class DetailUserService {
  static async execute({ userId }: UserData) {
    const user = await User.findById(userId).select(
      '-password -createdAt -updatedAt -__v'
    );

    return user;
  }
}
