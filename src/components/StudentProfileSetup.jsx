import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StudentProfileSetup({ onComplete }) {
  const [formData, setFormData] = useState({
    year: '',
    section: ''
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value.toUpperCase()
    }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.year) {
      newErrors.year = 'Year is required';
    }
    
    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    } else if (!/^[A-Za-z]$/.test(formData.section)) {
      newErrors.section = 'Section must be a single letter (A-Z)';
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
    
    // Update user data in localStorage
    const currentUser = JSON.parse(localStorage.getItem('tms_currentUser') || '{}');
    const users = JSON.parse(localStorage.getItem('tms_users') || '[]');
    
    // Update current user
    const updatedUser = {
      ...currentUser,
      year: parseInt(formData.year),
      section: formData.section.toUpperCase()
    };
    
    // Update users array
    const updatedUsers = users.map(u => 
      u.id === currentUser.id ? updatedUser : u
    );
    
    localStorage.setItem('tms_users', JSON.stringify(updatedUsers));
    localStorage.setItem('tms_currentUser', JSON.stringify(updatedUser));
    
    if (onComplete) {
      onComplete(updatedUser);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Complete Your Profile</h2>
        <p>Please provide your academic details to continue.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="year">Academic Year</label>
            <select
              id="year"
              name="year"
              value={formData.year}
              onChange={handleChange}
              className={errors.year ? 'error' : ''}
            >
              <option value="">Select Year</option>
              <option value="1">1st Year</option>
              <option value="2">2nd Year</option>
              <option value="3">3rd Year</option>
              <option value="4">4th Year</option>
            </select>
            {errors.year && <div className="error-message">{errors.year}</div>}
          </div>
          
          <div className="form-group">
            <label htmlFor="section">Section</label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              maxLength="1"
              placeholder="Enter section (A, B, C, etc.)"
              className={errors.section ? 'error' : ''}
            />
            {errors.section && <div className="error-message">{errors.section}</div>}
          </div>
          
          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Save and Continue
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
