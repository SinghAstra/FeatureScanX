import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to MongoDB Database");
  } catch (error) {
    console.log("Error connecting to MongoDB Database:", error);
  }
};

export default connectDB;
