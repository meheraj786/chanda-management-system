require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const seedData = require('./utils/seed');

const userRoutes = require('./routes/userRoutes');
const donationRoutes = require('./routes/donationRoutes');

const app = express();

// Middleware
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }));
app.use(express.json());

// Connect to database
connectDB();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/donations', donationRoutes);

// Seed database on startup (optional)
const shouldSeed = process.env.SEED_DB === 'true';
if (shouldSeed) {
  seedData();
}

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
