import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to="/" className="logo">AdminPanel</Link>
      </div>
      <div className="navbar-right">
        <ul>
          <li><Link to="/main/movies">Home</Link></li>
          <li><Link to="/main/favorites">Favorites</Link></li>
          <li><Link to="/main/search">Search</Link></li>
          <li><Link to="/main/settings">Settings</Link></li>
          <li><a onClick={() => localStorage.removeItem('accessToken')}>Logout</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
