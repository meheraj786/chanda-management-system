# Chanda Management Backend API

A sarcastic REST API mocking chanda/donation culture in Bangladesh.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

3. Update `.env` with your MongoDB URI, JWT secret, and Cloudinary credentials.

4. Start the server:
```bash
npm run dev
```

Server will run on `http://localhost:5000`

## API Endpoints

### Users
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/me` - Get current user (requires auth)
- `GET /api/users/donations` - Get user's donations (requires auth)

### Donations
- `POST /api/donations` - Create a donation (optional auth)
- `GET /api/donations` - Get all donations
- `GET /api/donations/stats/districts` - Get district-wise stats
- `GET /api/donations/stats/professions` - Get profession-wise stats
- `GET /api/donations/leaderboard` - Get top 10 donators

## Database Seeding

To seed initial data, set `SEED_DB=true` in your `.env` and restart the server.

## Features

- JWT authentication with bcrypt password hashing
- MongoDB integration with Mongoose
- Aggregate statistics (district & profession-wise)
- Leaderboard system
- Donation tracking per user
