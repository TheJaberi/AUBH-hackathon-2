import React from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import './Navbar.css';

const Navbar: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <nav className={`nav-bar ${isDark ? 'dark' : 'light'}`}>
      <Link to="/" className="logo">GenRes</Link>
      <div className={`nav-links ${isDark ? 'dark' : 'light'}`}>
        <Link to="/">Home</Link>
        <Link to="/learning">Learning Paths</Link>
        <Link to="/about">About</Link>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDark ? '☀️' : '🌙'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
