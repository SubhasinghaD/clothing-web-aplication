import mongoose from "mongoose";

const connectDB = async () => {
  mongoose.connection.on("connected", () => {
    console.log("DB Connected");
  });

  const mongoUri = process.env.MONGODB_URL; // use MONGODB_URL from your env
  if (!mongoUri) {
    throw new Error("MONGODB_URL is not set");
  }

  await mongoose.connect(`${mongoUri}/e-commerce`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

export default connectDB;
