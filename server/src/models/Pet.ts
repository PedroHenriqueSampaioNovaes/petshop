import mongoose from '../db/conn.js';
const { Schema } = mongoose;

const petSchema = new Schema(
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
  { timestamps: true }
);

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
