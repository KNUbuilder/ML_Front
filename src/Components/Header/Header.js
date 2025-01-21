import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = ({ isLoggedIn, onLogout }) => {
  return (
    <header className="header">
      <Link to="/" className="logo">OCR</Link>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/upload">Services</Link>
        <Link to="/about">About</Link>
        {isLoggedIn ? (
          <>
            <Link to="/mypage">MyPage</Link>
            <button onClick={onLogout} className="logout-button">Logout</button>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
};

export default Header;
