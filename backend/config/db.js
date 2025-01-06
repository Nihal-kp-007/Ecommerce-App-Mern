import mongoose from "mongoose";

const connectDb = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://nihalkp503:nihalkp503@cluster0.8fsz4.mongodb.net/data"
    );
    console.log(`MongoDb connected : ${conn.connection.host}`);
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

export default connectDb;
