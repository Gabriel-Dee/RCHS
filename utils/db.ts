import mongoose, { ConnectOptions } from "mongoose";

const connect = async (): Promise<void> => {
  if (mongoose.connection.readyState !== 0) return;

  try {
    await mongoose.connect(process.env.MONGO_URL as string);
  } catch (error) {
    throw new Error("Error connecting to Mongoose");
  }
};

export default connect;

