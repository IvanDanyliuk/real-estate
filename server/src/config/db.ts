import mongoose from "mongoose";
import { MONGODB_URI } from "../constants/env";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (error: any) {
    console.error('MongoDB connection failed', error);
    process.exit(1);
  }
};

export default connectDB;