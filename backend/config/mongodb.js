import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}`, {
      dbName: "prescripto",
    });
    console.log("mongodb connected successfully");
  } catch (error) {
    console.log("connection failed", error.message);
    process.exit(1);
  }
};

export default connectDB;
