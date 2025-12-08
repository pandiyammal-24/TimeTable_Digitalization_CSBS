import { useAuth } from '../AuthContext';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <header style={{
      background: 'rgba(0, 0, 0, 0.5)',
      padding: '15px 30px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      backdropFilter: 'blur(10px)',
    }}>
      <div>
        <h1 style={{
          fontSize: '24px',
          fontWeight: '700',
          color: 'white',
          margin: 0,
        }}>
          Timetable Management System
        </h1>
        <p style={{
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: '14px',
          margin: '5px 0 0 0',
        }}>
          Welcome, {user.name} ({user.role.charAt(0).toUpperCase() + user.role.slice(1)})
        </p>
      </div>
      <button
        onClick={handleLogout}
        className="btn btn-danger"
        style={{ width: 'auto', padding: '10px 24px' }}
      >
        Logout
      </button>
    </header>
  );
};

export default Header;
