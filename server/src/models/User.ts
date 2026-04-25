import mongoose, { Schema } from 'mongoose';

export interface IUser {
  name: string;
  email: string;
  password: string;
  image: {
    url: string;
    public_id: string;
  };
  phone: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      url: String,
      public_id: String,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
