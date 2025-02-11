import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Fly.css';
import flyImage from '../../assets/fly.png';

interface FlyProps {
  isDark: boolean;
}

const Fly: React.FC<FlyProps> = ({ isDark }) => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  
  const isHome = location.pathname === '/';

  const startExitAnimation = () => {
    setIsExiting(true);
    setTimeout(() => {
      setIsVisible(false);
      setIsExiting(false);
      setShouldAnimate(false);
    }, 800);
  };

  // Handle auto-dismiss after 5 seconds
  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    if (isVisible && !isDark && !isExiting) {
      timeout = setTimeout(() => {
        startExitAnimation();
      }, 5000);
    }
    return () => clearTimeout(timeout);
  }, [isVisible, isDark, isExiting]);

  // Handle initial render and theme changes
  useEffect(() => {
    if (!isHome) {
      setIsVisible(false);
      return;
    }

    if (isDark) {
      if (isVisible) {
        startExitAnimation();
      }
    } else {
      setIsExiting(false);
      setIsVisible(true);
      // Only trigger entrance animation if not already visible
      if (!isVisible) {
        setTimeout(() => {
          setShouldAnimate(true);
        }, 100);
      }
    }
  }, [isDark, isHome]);

  if (!isVisible) return null;

  return (
    <div
      className={`fly-container ${shouldAnimate ? 'animate' : ''} ${
        isExiting ? 'exit' : ''
      }`}
      onClick={startExitAnimation}
    >
      <img src={flyImage} alt="Fly" className="fly-image" />
    </div>
  );
};

export default Fly;
