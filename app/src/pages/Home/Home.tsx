import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import Fly from '../../components/Fly/Fly';
import './Home.css';

const Home: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="main-content">
      <Fly isDark={isDark} />
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
  );
};

export default Home;
