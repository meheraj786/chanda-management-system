# Chanda Management Frontend

A Next.js 16 application for the Chanda Management parody platform.

## Getting Started

### Installation

```bash
npm install
```

### Environment Setup

Create a `.env.local` file:

```bash
cp .env.example .env.local
```

Update the API URL (default is `http://localhost:5000/api`):

```
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

### Running the Application

Development mode:
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Project Structure

```
/frontend
├── /app
│   ├── page.tsx                 # Home page with charts and leaderboard
│   ├── layout.tsx               # Root layout with AuthProvider
│   ├── globals.css              # Global styles and theme
│   ├── /auth
│   │   ├── /login/page.tsx       # Login page
│   │   └── /register/page.tsx    # Registration page
│   ├── /donate
│   │   └── page.tsx             # Donation form page
│   └── /dashboard
│       └── page.tsx             # User dashboard
├── /components
│   ├── /ui                      # Shadcn UI components
│   ├── EntryGuiltModal.tsx      # Welcome modal component
│   ├── GuiltPopup.tsx           # Toast notification for guilt messages
│   ├── DistrictChart.tsx        # Bar chart of donations by district
│   ├── ProfessionChart.tsx      # Pie chart of donations by profession
│   ├── ExpenseChart.tsx         # Mock expense breakdown chart
│   └── Leaderboard.tsx          # Top donors leaderboard
├── /contexts
│   └── AuthContext.tsx          # Authentication context and provider
├── /lib
│   ├── api.ts                   # Axios API client configuration
│   └── guiltMessages.ts         # Array of guilt messages
├── /hooks
│   ├── use-toast.ts             # Toast notification hook
│   └── use-mobile.tsx           # Mobile detection hook
├── package.json
├── tsconfig.json
├── next.config.mjs
└── .env.example
```

## Key Components

### Authentication (AuthContext)
- Manages user login state
- Stores JWT token in localStorage
- Provides useAuth hook for accessing auth state
- Auto-loads user on app startup
- Handles token refresh on protected routes

### Charts
- **DistrictChart**: Shows top 10 districts by total donations
- **ProfessionChart**: Pie chart breakdown by profession
- **ExpenseChart**: Static mock expense distribution
- **Leaderboard**: Table of top 10 donors

### Pages

#### Home (/)
- Entry guilt modal on first visit
- Display all charts and statistics
- Navigation to login/register or dashboard
- Guilt popups appear every 20 seconds

#### Login & Register (/auth/login, /auth/register)
- Form validation
- Error handling
- Redirect to dashboard on success
- Link between login and register pages

#### Donate (/donate)
- Form with validation
- Profession-based minimum amounts
- District selector (all 64 Bangladesh districts)
- Amount slider
- Optional account association
- Success confirmation

#### Dashboard (/dashboard)
- Protected route (redirects to login if not authenticated)
- User profile information
- Donation statistics
- Personal donation history
- Quick links to donate again

## Features

### Real-time Updates
- Charts refresh every 30 seconds
- Leaderboard updates automatically
- Toast notifications for guilt messages

### Responsive Design
- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible grids and layouts

### State Management
- AuthContext for user authentication
- useAuth hook for easy access
- localStorage for token persistence

### Form Handling
- React Hook Form for form state
- Client-side validation
- Error messages for user guidance

### Data Visualization
- Recharts for interactive charts
- Responsive chart containers
- Tooltip information on hover

## Configuration

### API Configuration
Edit `lib/api.ts` to change the API base URL:
```typescript
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

### Toast Notifications
Toast notification duration can be adjusted in individual components.
Default is 5000ms (5 seconds).

### Guilt Messages
Add or modify guilt messages in `lib/guiltMessages.ts`:
```typescript
export const guiltMessages = [
  "Your message here",
  // ...
];
```

### Chart Data Refresh Rate
Charts refresh every 30 seconds. To change, edit the interval in:
- `components/DistrictChart.tsx`
- `components/ProfessionChart.tsx`
- `components/Leaderboard.tsx`

### Guilt Popup Frequency
Popups appear every 20 seconds. To change, edit `components/GuiltPopup.tsx`:
```typescript
const interval = setInterval(() => {
  // 20000ms = 20 seconds
}, 20000);
```

## Styling

### Tailwind CSS v4
- Utility-first CSS framework
- Custom theme in `globals.css`
- Responsive prefixes: `md:`, `lg:`, `xl:`

### Shadcn UI Components
Pre-built accessible components used:
- Button
- Card
- Input
- Select
- Slider
- Dialog
- Badge
- Table
- Alert
- Tabs (optional)

### Custom Styling
Add custom styles in `globals.css` or component-level `className` attributes.

## Building & Deployment

### Build
```bash
npm run build
```

### Production Start
```bash
npm start
```

### Deploy to Vercel
```bash
vercel deploy
```

## Troubleshooting

### "Cannot GET /" error
- Ensure app/page.tsx exists and is properly formatted
- Check for TypeScript errors in the file
- Restart the dev server

### Charts not showing data
- Verify backend API is running
- Check network requests in browser DevTools
- Ensure `NEXT_PUBLIC_API_URL` is correct
- Check API response format matches component expectations

### Authentication issues
- Verify JWT token is being stored in localStorage
- Check token format in API requests
- Ensure backend JWT_SECRET matches
- Check token expiration (default: 7 days)

### CORS errors
- Verify backend CORS configuration
- Ensure frontend URL is in backend CORS whitelist
- Check `FRONTEND_URL` in backend .env

### Styles not applying
- Ensure Tailwind CSS is compiled
- Check className syntax
- Verify Shadcn UI components are imported correctly
- Clear Next.js cache: `rm -rf .next`

## Performance Tips

1. **Image Optimization**: Use Next.js Image component
2. **Code Splitting**: Next.js automatically code-splits pages
3. **Lazy Loading**: Charts load data on demand
4. **Caching**: Implement SWR for data fetching
5. **Minification**: Automatically handled by Next.js build

## Security

- JWT tokens stored in localStorage (can be upgraded to httpOnly cookies)
- API requests include Authorization header
- Axios request interceptor for token attachment
- Protected routes redirect to login if not authenticated
- Password validation on registration

## Next Steps

1. Start the backend server (see backend README)
2. Run `npm run dev` to start frontend
3. Open `http://localhost:3000` in your browser
4. Complete the entry modal to access the main features
5. Register or login to access the dashboard
6. Start donating and watch the guilt accumulate!

## Additional Notes

- The application uses TypeScript for type safety
- All API calls include error handling
- Forms validate input before submission
- Toast notifications provide user feedback
- Responsive design works on all screen sizes
- Dark/light mode support via system preferences

---

For more information, see the main README.md in the project root.
