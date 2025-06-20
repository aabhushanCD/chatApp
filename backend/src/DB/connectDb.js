import mongoose from "mongoose";

export const connectDb = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("Database connected Successfuly");
  } catch (error) {
    console.error("Failed to connect DB!", error.message);
    process.exit(1);
  }
};
