# Chanda Management - A Sarcastic Donation Tracker

A complete MERN (MongoDB, Express, React/Next.js, Node.js) parody application that mocks chanda/donation culture in Bangladesh with humor and guilt-inducing mechanics.

**⚠️ DISCLAIMER**: This is a humorous parody. All features are fake, all donations are mock, and no real money is processed.

## Overview

Chanda Management is a sarcastic web application designed to humorously track and visualize the donation culture in Bangladesh. Features include:

- **Entry Guilt Modal**: Greets users with a welcome message to enter the "💰 চাঁন্দা Management"
- **Interactive Dashboard**: View donation statistics across districts, professions, and leaderboards
- **Donation Form**: A sarcastic form to submit fake donations with profession-based minimum amounts
- **Authentication System**: Register and login to track personal donation history
- **Real-time Charts**: Dynamic charts showing district-wise and profession-wise donations
- **Guilt Popups**: Random toast messages every 20 seconds with guilt-inducing messages
- **Leaderboard**: Top 10 donors ranked by total amount donated
- **User Dashboard**: View personal donation history and contributions

## Project Structure

```
/chanda-management
├── /backend (Express.js API)
│   ├── /config
│   │   ├── db.js (MongoDB connection)
│   │   └── cloudinary.js (Image upload config)
│   ├── /models
│   │   ├── User.js
│   │   └── Donation.js
│   ├── /controllers
│   │   ├── userController.js
│   │   └── donationController.js
│   ├── /routes
│   │   ├── userRoutes.js
│   │   └── donationRoutes.js
│   ├── /middlewares
│   │   └── auth.js (JWT authentication)
│   ├── /utils
│   │   ├── guiltMessages.js
│   │   └── seed.js (Database seeding)
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── /frontend (Next.js 16 with App Router)
│   ├── /app
│   │   ├── page.tsx (Home page)
│   │   ├── /donate (Donation form page)
│   │   ├── /dashboard (User dashboard)
│   │   ├── /auth
│   │   │   ├── /login
│   │   │   └── /register
│   │   ├── layout.tsx
│   │   └── globals.css
│   ├── /components
│   │   ├── /ui (Shadcn UI components)
│   │   ├── EntryGuiltModal.tsx
│   │   ├── GuiltPopup.tsx
│   │   ├── DistrictChart.tsx
│   │   ├── ProfessionChart.tsx
│   │   ├── ExpenseChart.tsx
│   │   └── Leaderboard.tsx
│   ├── /contexts
│   │   └── AuthContext.tsx (Authentication state)
│   ├── /lib
│   │   ├── api.ts (Axios API client)
│   │   └── guiltMessages.ts
│   ├── /hooks
│   ├── package.json
│   └── .env.example
│
├── README.md
└── .gitignore
```

## Tech Stack

### Backend

- **Express.js**: Web framework
- **MongoDB + Mongoose**: Database
- **JWT (jsonwebtoken)**: Authentication
- **bcryptjs**: Password hashing
- **CORS**: Cross-origin resource sharing
- **Cloudinary**: Image upload (optional)

### Frontend

- **Next.js 16**: React framework with App Router
- **Shadcn UI**: Component library
- **Tailwind CSS v4**: Styling
- **Axios**: HTTP client
- **React Hook Form**: Form management
- **Recharts**: Data visualization
- **Context API**: State management

## Setup Instructions

### Prerequisites

- Node.js 18+
- MongoDB (local or cloud URI)
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Update `.env` with your configuration:

```
PORT=5000
MONGO_URI=mongodb://localhost:27017/chanda-management
JWT_SECRET=your_jwt_secret_key_change_this
CLOUDINARY_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
FRONTEND_URL=http://localhost:3000
SEED_DB=true
```

5. Start the server:

```bash
npm run dev
```

The backend API will be available at `http://localhost:5000`

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env.local` file from `.env.example`:

```bash
cp .env.example .env.local
```

4. Update `.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

5. Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000`

## Features

### 1. Home Page (/)

- Entry guilt modal on first visit
- District-wise donation statistics (bar chart)
- Profession-wise breakdown (pie chart)
- Mock expense distribution chart
- Top 10 donors leaderboard
- Guilt popups every 20 seconds with random messages
- Call-to-action buttons to donate

### 2. Donation Form (/donate)

- Name field
- Profession dropdown (Doctor, Engineer, Teacher, Student, Businessman, Unemployed, Others)
- District selector (all 64 Bangladesh districts)
- Amount slider with profession-based minimum amounts
- Optional account linking (if logged in)
- Success confirmation with sarcastic message
- Form validation with error handling

### 3. Authentication System (/auth/login, /auth/register)

- User registration with email and password
- Login with JWT token generation
- Secure password hashing with bcryptjs
- Token stored in localStorage
- Protected routes (dashboard only accessible when logged in)

### 4. User Dashboard (/dashboard)

- User profile information
- Total donated amount
- Number of donations
- Personal donation history table
- Quick links to donate again
- Motivational (sarcastic) messages

### 5. Charts & Analytics

- **District-wise Chart**: Bar chart showing total donations per district
- **Profession-wise Chart**: Pie chart showing donations by profession
- **Expense Chart**: Mock pie chart of where donations go
- **Leaderboard**: Table of top 10 donors with rank, username, total amount, and tier

## API Endpoints

### User Endpoints

- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - User login
- `GET /api/users/me` - Get current user (requires auth)
- `GET /api/users/donations` - Get user's donations (requires auth)

### Donation Endpoints

- `POST /api/donations` - Create a new donation
- `GET /api/donations` - Get all donations
- `GET /api/donations/stats/districts` - Get district-wise statistics
- `GET /api/donations/stats/professions` - Get profession-wise statistics
- `GET /api/donations/leaderboard` - Get top 10 donors

## Database Seeding

The application includes a seed function that creates initial mock data when `SEED_DB=true` is set in the backend `.env` file.

The seed data includes:

- 5 sample users
- 50 mock donations across various districts and professions

To seed the database:

1. Set `SEED_DB=true` in `.env`
2. Start the backend server

## Guilt Messages

The application includes a collection of guilt-inducing messages that appear as toasts every 20 seconds:

- "Your district is lagging in chanda! Donate now?"
- "Other engineers donated ৳ 50,000 last week. Your move?"
- "The leaderboard is calling. Can you hear it?"
- "Even unemployed people donated more than you. Yikes."
- ...and many more!

## Profession-based Donation Minimums

The donation form suggests different minimum amounts based on profession:

- **Doctor**: ৳ 5,000
- **Engineer**: ৳ 4,000
- **Teacher**: ৳ 1,000
- **Businessman**: ৳ 10,000
- **Student**: ৳ 10
- **Unemployed**: ৳ 1
- **Others**: ৳ 100

## Styling

The application uses:

- **Tailwind CSS v4**: Utility-first CSS framework
- **Shadcn UI**: Pre-built, accessible components
- **Custom Components**: EntryGuiltModal, GuiltPopup, charts, etc.
- **Responsive Design**: Mobile-first approach with breakpoints for tablets and desktops

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcryptjs for secure password storage
- **HTTP-only Cookies**: Token management (can be enabled)
- **CORS**: Configured for frontend-backend communication
- **Input Validation**: Zod/React Hook Form validation on frontend
- **Server-side Validation**: Backend validation for all inputs

## Performance Optimizations

- Charts and data refresh every 30 seconds for real-time updates
- Toast messages appear every 20 seconds
- Image lazy loading via Next.js Image component (when added)
- Client-side caching with localStorage
- API request deduplication with Axios interceptors

## Future Enhancement Ideas

- Integration with Cloudinary for meme uploads
- Email notifications when donations reach milestones
- Social sharing features
- Donation categories and sub-categories
- Advanced filtering and sorting in leaderboard
- User profiles and badges
- Donation matching/challenges
- Payment gateway integration (with disclaimer about fake transactions)
- Analytics dashboard for admins
- Dark mode toggle

## Deployment

### Backend (Vercel, Heroku, or AWS)

```bash
# Build
npm run build

# Start
npm start
```

### Frontend (Vercel, Netlify)

```bash
# Build
npm run build

# Start
npm start
```

## Environment Variables Summary

### Backend (.env)

```
PORT=5000
MONGO_URI=mongodb://your-connection-string
JWT_SECRET=your-secret-key
CLOUDINARY_NAME=cloudinary-name
CLOUDINARY_API_KEY=cloudinary-key
CLOUDINARY_API_SECRET=cloudinary-secret
FRONTEND_URL=http://localhost:3000
SEED_DB=true
```

### Frontend (.env.local)

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

## Common Issues & Solutions

### Issue: "MongoDB connection failed"

- Ensure MongoDB is running
- Check MONGO_URI in .env is correct
- Verify MongoDB credentials

### Issue: "CORS error from frontend"

- Check FRONTEND_URL in backend .env
- Ensure frontend URL matches exactly
- Check backend CORS middleware configuration

### Issue: "401 Unauthorized" errors

- Verify JWT token is being sent with requests
- Check token expiration (set to 7 days)
- Ensure token is stored in localStorage after login

### Issue: Charts not loading

- Check if API is returning data correctly
- Verify Recharts dependency is installed
- Check browser console for errors

## Testing

The application comes with mock data for immediate testing:

1. **Login**: Use any of the seeded users:
   - Email: rahat@example.com, Password: password123
   - Email: fatima@example.com, Password: password123
   - (Other seeded users are available)

2. **Create Donations**: Use the /donate page to create mock donations

3. **View Stats**: Charts update in real-time as new donations are added

## Code Quality

- Modern ES6+ JavaScript/TypeScript
- Component-based architecture
- Async/await for async operations
- Proper error handling throughout
- Input validation on both frontend and backend
- Responsive design across all screen sizes

## License

This project is a humorous parody and is provided as-is for educational and entertainment purposes.

## Support

For issues or questions:

1. Check the troubleshooting section above
2. Review the code comments in key files
3. Check browser/server console logs
4. Verify all environment variables are set correctly

---

**Remember**: This is all for laughs. May your guilt be minimal and your donations be purely fictional!
