import mongoose from "mongoose";

const connectDB = async () => {

  try {
    console.log("=> Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGO_URI!);
    const connection = mongoose.connection;
    connection.on("connected",()=>{
      console.log("MongoDB connected successfully!");
    })
    connection.on("error",(err)=>{
      console.log(`MogoDB connection error! : ${err}`); 
    })
  } catch (error) {
    console.log(`Something went wrong! : ${error}`); 
  }
};

export default connectDB;