import mongoose from "mongoose";

const connectMongo = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URL, {});
    console.log("MongoDB connected");
  } catch (error) {
    console.error(error);
  }
};

export default connectMongo;
