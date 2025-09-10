import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb+srv://monilmodi501:Monil.2004@cluster0.e1yqkqo.mongodb.net/fullstack-project');
        console.log("DB Connected");
    } catch (error) {
        console.error("Database connection error:", error.message);
        // Don't throw the error, just log it to prevent the serverless function from crashing
    }
}