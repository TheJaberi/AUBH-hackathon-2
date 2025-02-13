import React, { useEffect, useRef } from 'react';
import Showcase from './Showcase';
import './Showcase.css';

interface ShowcaseInstance {
  dispose: () => void;
}

const ShowcaseComponent: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const showcaseRef = useRef<ShowcaseInstance | null>(null);

  useEffect(() => {
    if (containerRef.current && !showcaseRef.current) {
      showcaseRef.current = new Showcase(containerRef.current);
    }

    return () => {
      if (showcaseRef.current) {
        showcaseRef.current.dispose();
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="showcase-container"
    />
  );
};

export default ShowcaseComponent;
