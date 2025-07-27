import mongoose from "mongoose";
import { MONGO_URI } from "./ServerConfig.js";

async function connectDB() {
    try {
        await mongoose.connect(MONGO_URI)
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database: ",error);        
    }
};

export default connectDB;