import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Initialize default admin user if not exists
  const initializeAdminUser = () => {
    // Initialize tms_users as an empty array if it doesn't exist
    if (!localStorage.getItem('tms_users')) {
      localStorage.setItem('tms_users', JSON.stringify([]));
    }
    
    const users = JSON.parse(localStorage.getItem('tms_users'));
    console.log('Current users in storage:', users);
    
    // Check if admin exists (case-insensitive email check)
    const adminExists = users.some(user => 
      user.role === 'admin' && user.email.toLowerCase() === 'admin@tce.edu'
    );
    
    console.log('Admin exists:', adminExists);
    
    if (!adminExists) {
      const defaultAdmin = {
        id: 'admin-' + Date.now(),
        name: 'Admin User',
        email: 'admin@tce.edu',
        password: 'admin123', // In a real app, this should be hashed
        role: 'admin',
        createdAt: new Date().toISOString()
      };
      
      const updatedUsers = [...users, defaultAdmin];
      localStorage.setItem('tms_users', JSON.stringify(updatedUsers));
      console.log('Default admin user created:', defaultAdmin);
      console.log('Updated users in storage:', updatedUsers);
      return true;
    }
    return false;
  };

  useEffect(() => {
    // Initialize default admin user
    const adminInitialized = initializeAdminUser();
    
    // If we just created the admin user, log it
    if (adminInitialized) {
      console.log('Admin user was just initialized');
    }
    
    // Check for logged-in user
    const currentUser = localStorage.getItem('tms_currentUser');
    if (currentUser) {
      try {
        const parsedUser = JSON.parse(currentUser);
        setUser(parsedUser);
        console.log('Found logged in user:', parsedUser.email);
      } catch (error) {
        console.error('Error parsing current user:', error);
        localStorage.removeItem('tms_currentUser');
      }
    } else {
      console.log('No user is currently logged in');
    }
    
    setLoading(false);
    
    // Debug: Log the current state of localStorage
    console.log('Current localStorage state:', {
      tms_users: JSON.parse(localStorage.getItem('tms_users') || '[]'),
      tms_currentUser: localStorage.getItem('tms_currentUser')
    });
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('tms_currentUser', JSON.stringify(userData));
  };
  
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('tms_currentUser', JSON.stringify(updatedUserData));
    
    // Also update the user in the users array
    const users = JSON.parse(localStorage.getItem('tms_users') || '[]');
    const updatedUsers = users.map(u => 
      u.id === updatedUserData.id ? updatedUserData : u
    );
    localStorage.setItem('tms_users', JSON.stringify(updatedUsers));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('tms_currentUser');
  };

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        color: 'white',
        fontSize: '18px'
      }}>
        Loading...
      </div>
    );
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
