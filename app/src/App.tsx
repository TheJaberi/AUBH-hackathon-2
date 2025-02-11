import './App.css'
import React from 'react';

const WelcomePage = () => {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`welcome-container ${isDark ? 'dark' : 'light'}`}>
      <nav className={`nav-bar ${isDark ? 'dark' : 'light'}`}>
        <div className="logo">AI Learning</div>
        <div className={`nav-links ${isDark ? 'dark' : 'light'}`}>
          <a href="#home">Home</a>
          <a href="#courses">Courses</a>
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <button className="theme-toggle" onClick={toggleTheme}>
            {isDark ? '☀️' : '🌙'}
          </button>
        </div>
      </nav>
      <div className="main-content">
        <h1>Welcome to AI Learning</h1>
        <p className={`subtitle ${isDark ? 'dark' : 'light'}`}>
          Discover the fascinating world of artificial intelligence through our interactive learning platform
        </p>
        <div className="circle-grid">
          {['🏠', '📚', '⚙️', '👤', '📖', '🔧'].map((emoji, index) => (
            <div className="circle-item" key={index}>
              <div className={`circle circle-${index + 1}`}>{emoji}</div>
            </div>
          ))}
        </div>
        <div className="button-group">
          <button className="btn btn-primary">Get Started</button>
          <button className={`btn btn-secondary ${isDark ? 'dark' : 'light'}`}>Learn More</button>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
