# Timetable Management System

A complete React-based Timetable Management System with role-based dashboards for students, faculty, and administrators.

## Features

### Authentication
- Email/password login with domain validation (@tce.edu)
- Role-based registration (Student, Faculty, Admin)
- Persistent authentication using localStorage

### Student Dashboard
- View personalized timetable filtered by year and section
- See current substitutions
- Browse available venues

### Faculty Dashboard
- View personal teaching schedule
- Apply for leave requests
- View leave request status
- Accept/reject substitution requests

### Admin Dashboard
- View overall institution timetable
- Manage leave requests (approve/reject)
- View venue availability and schedules

## Tech Stack

- **Framework**: React 18 with Vite
- **Routing**: react-router-dom v6
- **Styling**: Plain CSS (no frameworks)
- **Data Storage**: localStorage (mock database)
- **Icons**: lucide-react

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone or download the project

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Preview production build:
```bash
npm run preview
```

## Usage

### First Time Setup

1. Navigate to the signup page
2. Create an account with:
   - Email ending in `@tce.edu` (case-insensitive)
   - Password (minimum 6 characters)
   - Select your role (Student/Faculty/Admin)
   - If student: provide year and section

### Login

1. Select your role from the dropdown
2. Enter your email (@tce.edu domain required)
3. Enter your password
4. You'll be redirected to your role-specific dashboard

### Test Credentials

You can create your own accounts or use these mock scenarios:

**Student Account:**
- Email: student@tce.edu
- Password: password123
- Role: Student
- Year: 2
- Section: A

**Faculty Account:**
- Email: faculty@tce.edu
- Password: password123
- Role: Faculty

**Admin Account:**
- Email: admin@tce.edu
- Password: password123
- Role: Admin

## Project Structure

```
src/
├── main.jsx                 # Application entry point
├── App.jsx                  # Main app with routing
├── AuthContext.jsx          # Authentication context provider
├── api.js                   # API placeholder for future backend
├── styles/
│   └── global.css          # Global styles and theme
├── assets/
│   └── bg.jpeg             # Background image
├── data/
│   └── mockData.js         # Mock timetable and venue data
├── components/
│   ├── TimetableTable.jsx  # Reusable timetable component
│   └── Header.jsx          # Shared header with logout
└── pages/
    ├── LoginPage.jsx
    ├── SignupPage.jsx
    ├── StudentDashboard.jsx
    ├── FacultyDashboard.jsx
    └── AdminDashboard.jsx
```

## Customization

### Adding Your Own Background Image

Replace `src/assets/bg.jpeg` with your own background image. The image should be high resolution (recommended 1920x1080 or higher) for best results.

### Modifying Mock Data

Edit `src/data/mockData.js` to customize:
- Venues
- Timetable entries
- Leave requests
- Substitution requests

## Future Backend Integration

To connect this application to a real backend:

1. **Update AuthContext.jsx** (src/AuthContext.jsx):
   - Replace localStorage operations with API calls to `/api/auth/login` and `/api/auth/signup`
   - Store JWT tokens instead of user objects
   - Add token refresh logic

2. **Update api.js** (src/api.js):
   - Replace Promise-based mock functions with actual fetch/axios calls
   - Add error handling and token management
   - Implement endpoints:
     - `POST /api/auth/signup`
     - `POST /api/auth/login`
     - `POST /api/auth/logout`
     - `GET /api/timetable`
     - `POST /api/leave-requests`
     - `GET /api/leave-requests`
     - `PUT /api/leave-requests/:id`

3. **Update Dashboard Components**:
   - Replace mock data imports with API calls
   - Add loading states
   - Implement proper error handling

4. **Add Environment Variables**:
   ```
   VITE_API_BASE_URL=http://your-backend-url.com
   ```

## Key Features Implementation

### Email Domain Validation
All authentication requires emails ending with `tce.edu`. This is validated on both signup and login pages.

### Role-Based Access Control
Routes are protected based on user roles. Users are automatically redirected to their appropriate dashboard after login.

### Persistent Sessions
User sessions persist across page refreshes using localStorage.

### Responsive Design
The application is mobile-friendly with responsive breakpoints.

## Accessibility

- All form inputs have proper labels
- Keyboard navigation supported
- Clear error messages for form validation
- High contrast colors for readability

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

MIT License - feel free to use this project for educational purposes.

## Contributing

This is a demonstration project. For production use, implement proper backend authentication and database integration.
