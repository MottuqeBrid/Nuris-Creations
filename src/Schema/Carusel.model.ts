import mongoose from "mongoose";

const CaruselSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    title: {
      type: String,
      trim: true,
    },
    link: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true },
);
export const Carusel =
  mongoose.models.Carusel || mongoose.model("Carusel", CaruselSchema);

export interface CaruselType {
  _id: string;
  image: string;
  description: string;
  title: string;
  link: string;
  createdAt: string;
  updatedAt: string;
}
