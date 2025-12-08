import { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState(location.state?.message || '');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.toLowerCase().endsWith('@tce.edu') && !formData.email.toLowerCase().endsWith('@student.tce.edu')) {
      newErrors.email = 'Email must end with @tce.edu or @student.tce.edu';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccessMessage('');

    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('tms_users') || '[]');
    const email = formData.email.toLowerCase();
    
    // Determine role based on email domain
    const role = email.endsWith('@student.tce.edu') ? 'student' : 
                email.endsWith('@tce.edu') ? 'faculty' : 'student'; // Default to student if domain is not recognized

    const user = users.find(
      u =>
        u.email.toLowerCase() === email &&
        u.password === formData.password
    );

    if (!user) {
      setErrors({ general: 'Invalid credentials. Please check your email and password.' });
      return;
    }
    
    // Verify the user's role matches the email domain
    if (user.role !== role && user.role !== 'admin') {
      setErrors({ general: 'Invalid role for this email domain.' });
      return;
    }

    login(user);

    switch (user.role) {
      case 'student':
        navigate('/student-dashboard');
        break;
      case 'faculty':
        navigate('/faculty-dashboard');
        break;
      case 'admin':
        navigate('/admin-dashboard');
        break;
      default:
        navigate('/');
    }
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Login</h2>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errors.general && (
          <div className="error-message" style={{ marginBottom: '15px', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
<div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="yourname@tce.edu"
            />
            {errors.email && <div className="error-message">{errors.email}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            Login
          </button>
          <div className="forgot-password" style={{ marginTop: '10px', textAlign: 'center' }}>
            <Link to="/forgot-password" style={{ color: '#007bff', textDecoration: 'none' }}>
              Forgot Password?
            </Link>
          </div>

          <div className="auth-link">
            Don't have an account? <Link to="/signup">Sign up here</Link>
          </div>
          <div className="admin-link" style={{ marginTop: '15px', textAlign: 'center' }}>
            <Link to="/admin-login" style={{ color: '#666', textDecoration: 'none' }}>
              Admin Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
