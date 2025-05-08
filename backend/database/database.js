import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); 
// const MONGO_URI=
// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};
 export default connectDB