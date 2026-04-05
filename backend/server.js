// ==========================
// IMPORT DEPENDENCIES
// ==========================
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import multer from 'multer';

import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import fishRoutes from './src/routes/fishRoutes.js';


// ==========================
// ENV CONFIG
// ==========================
dotenv.config();


// ==========================
// DATABASE CONNECTION
// ==========================
connectDB();


// ==========================
// EXPRESS APP
// ==========================
const app = express();
const PORT = process.env.PORT || 5000;


// ==========================
// MULTER CONFIG (IMAGE UPLOAD)
// ==========================
const storage = multer.memoryStorage();
const upload = multer({ storage });


// ==========================
// MIDDLEWARE
// ==========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// image upload middleware
app.use(upload.single('image'));


// ==========================
// ROUTES
// ==========================

// Test route
app.get('/', (req, res) => {
  res.json({ message: '🚀 Backend server running!' });
});

// Auth Routes
app.use('/api/auth', authRoutes);

// Fish Routes (NEW ✅)
app.use('/api/fish', fishRoutes);


// ==========================
// SERVER START
// ==========================
app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});