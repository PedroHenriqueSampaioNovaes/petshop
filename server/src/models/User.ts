import mongoose from '../db/conn.js';
const { Schema } = mongoose;

const userSchema = new Schema(
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
      data: String,
      contentType: String,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;
