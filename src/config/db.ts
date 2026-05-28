
import mongoose from "mongoose";

const connectDB = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;
        connection.on('connected',()=>{
            console.log("MongoDB connected successfully!")
        })

        connection.on('error',(err)=>{
            console.log(`MongoDB connection error: ${err}`)
            process.exit(1);
        })
    } catch (error) {
        console.log(`Something went wrong!`)
        process.exit(1);
    }
}