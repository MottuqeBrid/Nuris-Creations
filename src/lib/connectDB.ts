import mongoose from "mongoose";

const DB_URI =
  process.env.DB_URI || "mongodb://localhost:27017/nuris-creations";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState === 1) {
      return;
    }
    await mongoose.connect(DB_URI);
  } catch (err: unknown) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
};
