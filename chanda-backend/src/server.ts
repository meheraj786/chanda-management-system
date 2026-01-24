import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable CORS
app.use(cors({
  origin: 'http://localhost:3000'
}));

// Mount routers
app.use('/api/auth', require('./routes/auth').default);
app.use('/api/donations', require('./routes/donations').default);
app.use('/api/stats', require('./routes/stats').default);
app.use('/api/user', require('./routes/user').default);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  () => console.log(`Server running on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error, promise: Promise<any>) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
