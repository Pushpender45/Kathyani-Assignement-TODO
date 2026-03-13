import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { HiOutlineLogout, HiOutlineUser } from 'react-icons/hi';
import { PiLeafFill } from 'react-icons/pi';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <PiLeafFill className="nav-leaf" />
        <span className="navbar-title">Katyayani Organics</span>
        <span className="navbar-divider">|</span>
        <span className="navbar-subtitle">Task Portal</span>
      </div>

      <div className="navbar-user">
        <div className="user-badge">
          <HiOutlineUser />
          <span>{user?.name}</span>
        </div>
        <button id="logout-btn" className="logout-btn" onClick={handleLogout}>
          <HiOutlineLogout />
          <span>Logout</span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
