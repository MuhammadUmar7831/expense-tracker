import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGO_URI;

export const connectDB = async () => {
    try {
        await mongoose.connect(mongoURI);
        console.log(':) MongoDB connected');
    } catch (err) {
        console.error(":( Failed to connect to MONGODB");
        process.exit(1);
    }
};
