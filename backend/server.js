// Import dependencies
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';

// Initialize environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(upload.single('image'));

// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the backend server!' });
});

// Auth Routes
app.use('/', authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
