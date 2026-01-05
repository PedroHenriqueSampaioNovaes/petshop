import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import ApiError from '../../utils/ApiError.js';
import User from '../../models/User.js';

interface UserData {
  email: string;
  password: string;
}

export class LoginUserService {
  static async execute({ email, password }: UserData) {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError('E-mail ou senha não existe.');

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) throw new ApiError('E-mail ou senha não existe.');

    try {
      const token = jwt.sign(
        {
          email: user.email,
          _id: user._id,
        },
        process.env.TOKEN_SECRET as string,
        {
          expiresIn: '7d',
        }
      );

      const userData = {
        name: user.name,
        email: user.email,
        image: user.image,
      };

      return {
        user: userData,
        token,
      };
    } catch (err) {
      console.error(err);
      throw new Error(err as string);
    }
  }
}
