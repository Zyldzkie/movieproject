import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import './Main.css';

function Main() {
  const accessToken = localStorage.getItem('accessToken');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  const handleNavigation = (path) => {
    navigate(path); // Programmatically navigate to the desired path
  };

  useEffect(() => {
    if (!accessToken) {
      handleLogout();
    }
  }, [accessToken]);

  return (
    <div className="main-layout">
      <div className="navigation">
        <ul>
          <li onClick={() => handleNavigation('/Main/Movies')}>Home</li> {/* Replaced href with navigate */}
          <li onClick={() => handleNavigation('/main/favorites')}>Favorites</li> {/* Replaced href with navigate */}
          <li onClick={() => handleNavigation('/main/search')}>Search</li> {/* Replaced href with navigate */}
          <li onClick={() => handleNavigation('/Main/settings')}>Settings</li> {/* Replaced href with navigate */}
          <li className="logout" onClick={handleLogout}>Logout</li>
        </ul>
      </div>

      <div className="content-layout">
        <div className="left-side">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Main;
