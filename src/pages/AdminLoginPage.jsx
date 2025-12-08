import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const AdminLoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const [errors, setErrors] = useState({});

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
    } else if (!formData.email.toLowerCase().endsWith('@tce.edu')) {
      newErrors.email = 'Admin email must end with @tce.edu';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const users = JSON.parse(localStorage.getItem('tms_users') || '[]');
    const email = formData.email.toLowerCase();
    
    console.log('All users in storage:', users);
    
    const user = users.find(u => u.email.toLowerCase() === email);
    console.log('Found user:', user);
    
    if (!user) {
      console.log('No user found with email:', email);
      setErrors({ general: 'No admin account found with this email.' });
      return;
    }
    
    if (user.password !== formData.password) {
      console.log('Password mismatch for user:', user.email);
      setErrors({ general: 'Incorrect password. Please try again.' });
      return;
    }
    
    if (user.role !== 'admin') {
      console.log('User is not an admin:', user);
      setErrors({ general: 'This account does not have admin privileges.' });
      return;
    }

    login(user);
    navigate('/admin-dashboard');
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Admin Login</h2>

        {errors.general && (
          <div className="error-message" style={{ marginBottom: '15px', textAlign: 'center' }}>
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Admin Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="admin@tce.edu"
              autoComplete="username"
              autoFocus
              required
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
              autoComplete="current-password"
              required
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            Login as Admin
          </button>

          <div className="auth-link">
            <Link to="/login">Back to regular login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminLoginPage;
