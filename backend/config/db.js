import mongoose from "mongoose";

export const connectDB = async () => {
  if (!process.env.MONGO_URL) {
    console.error("MONGO_URL is missing. Copy .env.example to .env and fill it in.");
    process.exit(1);
  }
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("DB Connected");
  } catch (error) {
    console.error("DB connection failed:", error.message);
    process.exit(1);
  }
};
