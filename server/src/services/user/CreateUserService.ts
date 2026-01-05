import bcrypt from 'bcryptjs';

import ApiError from '../../utils/ApiError.js';
import User from '../../models/User.js';

interface UserData {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export class CreateUserService {
  static async execute({ name, email, phone, password }: UserData) {
    const userExists = await User.findOne({ email });

    if (userExists) {
      throw new ApiError('Este e-mail já está em uso!', 422);
    }

    // create a password hash
    const salt = await bcrypt.genSalt(12);
    const passwordHash = await bcrypt.hash(password, salt);

    // create a user
    const user = new User({
      name,
      email,
      phone,
      password: passwordHash,
    });

    try {
      const newUser = await user.save();

      return newUser;
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    }
  }
}
