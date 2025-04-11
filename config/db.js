import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect('mongodb+srv://dhaaranig22cse:5hcGsKkQ2uaOi3sb@consultancy.zuiwikn.mongodb.net/?retryWrites=true&w=majority&appName=consultancy', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
