import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors'; // ✅ Added CORS import
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Connect to the database
connectDB();

// ✅ Configure CORS
const allowedOrigins = [
  'https://tamilnadu-trader.onrender.com',
   'http://localhost:3000'
 // your frontend domain on Render
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if using cookies or authentication headers
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// API Routes
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

// PayPal Configuration Route
app.get('/api/config/paypal', (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

// Determine the base directory
const __dirname = path.resolve();

// Serve the uploads folder
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}

// Custom error handling middleware
app.use(notFound);
app.use(errorHandler);

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`);
});
