import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-top">
        <span>✆ +1 (555) 123-4567</span>
        <span>✉ reservations@grandluxe.com</span>
        <span>Grand Luxe Hotel & Resorts</span>
      </div>
      <nav className="header-nav">
        <Link to="/" className="logo">
          <span className="logo-grand">GRAND</span>
          <span className="logo-luxe">LUXE</span>
          <span className="logo-sub">HOTEL & RESORTS</span>
        </Link>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span /><span /><span />
        </button>

        <ul className={`nav-links ${menuOpen ? 'open' : ''}`}>
          <li><Link to="/" onClick={() => setMenuOpen(false)}>Home</Link></li>
          <li><Link to="/rooms" onClick={() => setMenuOpen(false)}>Rooms & Suites</Link></li>
          <li><a href="#amenities" onClick={() => setMenuOpen(false)}>Amenities</a></li>
          <li><a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a></li>
          {user ? (
            <>
              <li>
                <Link
                  to={user.role === 'ADMIN' ? '/admin' : '/dashboard'}
                  onClick={() => setMenuOpen(false)}
                >
                  {user.name.split(' ')[0]}
                </Link>
              </li>
              <li>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li><Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link></li>
              <li>
                <Link to="/register" className="btn-book" onClick={() => setMenuOpen(false)}>
                  Book Now
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
