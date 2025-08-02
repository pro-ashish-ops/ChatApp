import mongoose from "mongoose";

// Function to connect to database 

export const connectDB = async () => {
    try {
        console.log("Connecting to MongoDB URI:", process.env.MONGODB_URI);
        mongoose.connection.on('connected', () => {
            console.log("Database connected");
        });

        await mongoose.connect(`${process.env.MONGODB_URI}/chat-app`);
    } catch (error) {
        console.log(error);
    }
}