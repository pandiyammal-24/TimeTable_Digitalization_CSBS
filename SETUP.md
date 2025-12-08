# Quick Setup Guide

## Installation & Running

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Creating Your First User

1. Start the dev server with `npm run dev`
2. Navigate to http://localhost:5173
3. You'll be redirected to the login page
4. Click "Sign up here" to create an account

### Signup Requirements:
- **Name**: Any name
- **Email**: Must end with `tce.edu` (e.g., `john@tce.edu`)
- **Role**: Choose Student, Faculty, or Admin
- **Year & Section**: Required only for students (e.g., Year 2, Section A)
- **Password**: Minimum 6 characters

After signup, you'll be redirected to login automatically.

## Example Test Accounts

Create these accounts to test all features:

### Student Account
```
Name: John Student
Email: john@tce.edu
Role: Student
Year: 2
Section: A
Password: student123
```

### Faculty Account
```
Name: Dr. Smith
Email: smith@tce.edu
Role: Faculty
Password: faculty123
```

### Admin Account
```
Name: Admin User
Email: admin@tce.edu
Role: Admin
Password: admin123
```

## Features by Role

### Student Dashboard
- ✅ View timetable (filtered by year and section)
- ✅ See substitution classes
- ✅ View available venues

### Faculty Dashboard
- ✅ View personal teaching schedule
- ✅ Apply for leave
- ✅ View leave request status
- ✅ Accept/reject substitution requests

### Admin Dashboard
- ✅ View complete timetable
- ✅ Approve/reject leave requests
- ✅ View venue schedules and availability

## Customization

### Change Background Image
Replace `src/assets/bg.jpeg` with your preferred image (recommended: 1920x1080 or higher).

### Modify Timetable Data
Edit `src/data/mockData.js` to customize:
- Classes and schedules
- Venues
- Faculty assignments
- Leave requests

## Backend Integration Guide

### Current Implementation (localStorage)
All data is stored in browser localStorage:
- `tms_users` - User accounts
- `tms_currentUser` - Current session
- `tms_leaveRequests` - Leave requests
- `tms_substitutions` - Substitution requests

### Migrating to Real Backend

**1. Update `src/api.js`:**
Replace mock functions with real API calls:

```javascript
export const authAPI = {
  signup: async (userData) => {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData)
    });
    return response.json();
  },

  login: async (credentials) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials)
    });
    return response.json();
  }
};
```

**2. Update `src/AuthContext.jsx`:**
Replace localStorage with JWT token management:

```javascript
const login = async (userData) => {
  // Store JWT token instead of full user object
  localStorage.setItem('token', userData.token);
  setUser(userData.user);
};
```

**3. Update Dashboard Components:**
Replace mock data imports with API calls:

```javascript
// Instead of: import { mockTimetable } from '../data/mockData';
// Use:
const [timetable, setTimetable] = useState([]);

useEffect(() => {
  fetch('/api/timetable', {
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => setTimetable(data));
}, []);
```

**4. Required Backend Endpoints:**
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User authentication
- `GET /api/timetable` - Get timetable data
- `POST /api/leave-requests` - Submit leave request
- `GET /api/leave-requests` - Get leave requests
- `PUT /api/leave-requests/:id` - Update leave status
- `GET /api/venues` - Get venue list
- `POST /api/substitutions` - Create substitution request
- `PUT /api/substitutions/:id` - Accept/reject substitution

## Troubleshooting

### Login Issues
- Ensure email ends with `tce.edu`
- Check password is at least 6 characters
- Verify you created an account first

### Background Not Showing
- Check `src/assets/bg.jpeg` exists
- Verify image file is valid JPEG format
- Clear browser cache and reload

### Build Errors
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
npm run build
```

## Development Tips

- Use React DevTools for debugging
- Check browser console for errors
- All authentication state is in AuthContext
- Mock data is in `src/data/mockData.js`

## Security Notes (Production)

⚠️ **Important**: This is a demonstration app using localStorage for authentication.

For production deployment:
- ✅ Implement proper JWT authentication
- ✅ Use HTTPS for all requests
- ✅ Store tokens securely (httpOnly cookies)
- ✅ Implement password hashing on backend
- ✅ Add CSRF protection
- ✅ Implement rate limiting
- ✅ Add proper input validation on backend

## Support

For issues or questions about backend integration, refer to `README.md` or check the inline comments in:
- `src/AuthContext.jsx`
- `src/api.js`
- Dashboard component files
