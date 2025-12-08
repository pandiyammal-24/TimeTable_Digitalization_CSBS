import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const SignupPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  // Determine role based on email domain
  const getRoleFromEmail = (email) => {
    if (!email) return 'student';
    const emailLower = email.toLowerCase();
    return emailLower.endsWith('@student.tce.edu') ? 'student' : 
           emailLower.endsWith('@tce.edu') ? 'faculty' : 'student';
  };
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

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.toLowerCase().endsWith('tce.edu')) {
      newErrors.email = 'Email must end with tce.edu';
    }

    const role = getRoleFromEmail(formData.email);
    // Year and section will be collected after login for students

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
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

    const role = getRoleFromEmail(formData.email);
    const existingUser = users.find(
      u => u.email.toLowerCase() === formData.email.toLowerCase()
    );

    if (existingUser) {
      setErrors({ email: 'User with this email and role already exists' });
      return;
    }
    const newUser = {
      id: Date.now(),
      name: formData.name,
      email: formData.email,
      role: role,
      password: formData.password,
    };

    users.push(newUser);
    localStorage.setItem('tms_users', JSON.stringify(users));

    navigate('/login', { state: { message: 'Registration successful! Please login.' } });
  };

  return (
    <div className="page-container">
      <div className="auth-card">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your full name"
            />
            {errors.name && <div className="error-message">{errors.name}</div>}
          </div>

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
            <label>Role</label>
            <div className="role-display">
              {getRoleFromEmail(formData.email) === 'student' ? 'Student' : 'Faculty'}
              <small className="role-hint">
                (Automatically determined by email domain: @student.tce.edu for students, @tce.edu for faculty)
              </small>
            </div>
          </div>


          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password (min 6 characters)"
            />
            {errors.password && <div className="error-message">{errors.password}</div>}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter password"
            />
            {errors.confirmPassword && <div className="error-message">{errors.confirmPassword}</div>}
          </div>

          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>

          <div className="auth-link">
            Already have an account? <Link to="/login">Login here</Link>
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

export default SignupPage;
