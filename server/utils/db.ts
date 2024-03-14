import mongoose from "mongoose";
require("dotenv").config();

const dbUrl: string = process.env.DB_URI || "";

//? db connection
const connectDB = async () => {
  try {
    await mongoose.connect(dbUrl).then(async (data: any) => {
      console.log(`MongoDB Connected with ${data.connection.host}`);
    });
  } catch (err: any) {
    console.log(err.message);
    setTimeout(connectDB, 5000); // retry after 5s
  }
};

export default connectDB;
