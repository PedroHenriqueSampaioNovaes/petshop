import User from '../../models/User.js';
import { v2 as cloudinary } from 'cloudinary';

import ApiError from '../../utils/ApiError.js';

import { MulterMemoryFile } from '../../@types/image.js';
import uploadImageToCloudinary from '../../utils/uploadImageToCloudinary.js';
import bcrypt from 'bcryptjs';

interface UserData {
  userId: string;
  name: string;
  email: string;
  phone: string;
  password?: string;
  image?: MulterMemoryFile;
}

export class UpdateUserService {
  static async execute({
    userId,
    name,
    email,
    phone,
    password,
    image,
  }: UserData) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError('Usuário não encontrado.', 404);

    // check if email has already taken
    const userExists = await User.findOne({ email });

    if (user.email !== email && userExists) {
      throw new ApiError('Por favor, utilize outro e-mail!', 422);
    }

    if (image) {
      if (user.image.public_id) {
        // remove images of the cloudinary
        try {
          await cloudinary.uploader.destroy(user.image.public_id as string);
        } catch (error) {
          throw new ApiError(
            'Erro ao tentar deletar a imagem do usuário na núvem.',
            400,
          );
        }
      }

      // upload the new image
      const upload = await uploadImageToCloudinary(image, 'users');
      user.image.url = upload.secure_url;
      user.image.public_id = upload.public_id;
    }

    user.name = name;
    user.email = email;
    user.phone = phone;

    // create a password hash
    if (password) {
      const salt = await bcrypt.genSalt(12);
      const passwordHash = await bcrypt.hash(password, salt);

      user.password = passwordHash;
    }

    try {
      const userUpdated = await User.findOneAndUpdate(
        { _id: user._id },
        { $set: user },
        { new: true },
      );

      return { userUpdated, message: 'Usuário atualizado com sucesso!' };
    } catch (err) {
      throw new Error('Não foi possível atualizar os dados do usuário.');
    }
  }
}
