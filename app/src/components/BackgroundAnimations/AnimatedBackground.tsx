import React from 'react';
import './AnimatedBackground.css';

interface AnimatedBackgroundProps {
  isDark: boolean;
}

const AnimatedBackground: React.FC<AnimatedBackgroundProps> = ({ isDark }) => {
  return (
    <div className={`animated-background ${isDark ? 'dark' : 'light'}`}>
      <div className="gradient-layer">
        {/* Generate multiple gradient shapes */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={`gradient-${i}`} className={`gradient-shape shape-${i + 1}`} />
        ))}
      </div>
      
      <div className="pattern-layer">
        {/* Circuit pattern overlays */}
        <div className="circuit-pattern top-left" />
        <div className="circuit-pattern bottom-right" />
      </div>

      <div className="geometric-layer">
        {/* Geometric shapes */}
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={`geo-${i}`} className={`geometric-shape geo-${i + 1}`}>
            <svg viewBox="0 0 100 100" className="shape-svg">
              {i % 2 === 0 ? (
                <polygon points="50,5 95,90 5,90" className="shape-fill" />
              ) : (
                <circle cx="50" cy="50" r="45" className="shape-fill" />
              )}
            </svg>
          </div>
        ))}
      </div>

      {/* Overlay to control the overall opacity and blend */}
      <div className={`background-overlay ${isDark ? 'dark' : 'light'}`} />
    </div>
  );
};

export default AnimatedBackground;
