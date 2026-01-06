import mongoose from '../db/conn.js';
const { Schema } = mongoose;

const imagesSchema = new Schema({
  data: { type: String, required: true },
  contentType: { type: String, required: true },
});

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
      type: String,
      required: true,
    },
    location: { state: String, municipality: String },
    description: {
      type: String,
      required: true,
    },
    images: {
      type: [imagesSchema],
      required: true,
    },
    available: {
      type: Boolean,
    },
    user: Object,
    adopter: Object,
  },
  { timestamps: true }
);

const Pet = mongoose.model('Pet', petSchema);

export default Pet;
