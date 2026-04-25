import mongoose, { Schema } from 'mongoose';

export interface IPet {
  name: string;
  age: number;
  weight: number;
  gender: string;
  breed: string;
  castrationStatus: boolean;
  location: {
    state: string;
    municipality: string;
  };
  description: string;
  images: {
    url: string;
    public_id: string;
  }[];
  available: boolean;
  user: {
    _id: mongoose.Types.ObjectId;
    name: string;
    image: string;
    phone: string;
  };
  adopter: {
    _id: mongoose.Types.ObjectId;
    name: string;
    image: {
      url: string;
      public_id: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

const petSchema = new Schema<IPet>(
  {
    name: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    weight: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    breed: {
      type: String,
      required: true,
    },
    castrationStatus: {
      type: Boolean,
      required: true,
    },
    location: {
      type: {
        state: String,
        municipality: String,
      },
      required: true,
      _id: false,
    },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [
        {
          url: String,
          public_id: String,
        },
      ],
      required: true,
      _id: false,
    },
    available: Boolean,
    user: Object,
    adopter: Object,
  },
  { timestamps: true },
);

const Pet = mongoose.model<IPet>('Pet', petSchema);

export default Pet;
