import React from 'react';
import './claudeUI.css';
import { IconLucideArrowUp } from '../arrowUp/arrowUp';

interface GreetingProps {
  username: string;
}

const Greeting: React.FC<GreetingProps> = ({ username }) => {
  return (
    <div className="greeting-container">
      <div className="greeting-content">
        <div className="greeting-header">
          <span className="star-icon">✹</span>
          <h1>Good evening, {username}</h1>
        </div>
        
        <div className="greeting-input-container">
          <input 
            type="text"
            placeholder="How can Claude help you today?"
            className="greeting-input"
            disabled
          />
          
          <div className="greeting-footer">
            <span className="model-name">Claude 3.5 Sonnet</span>
            <div className="style-selector">
              <button className="style-button">
                Send
                <IconLucideArrowUp/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Greeting;
