import React from 'react';
import './claudeUI.css';
import { IconLucideArrowUp } from '../arrowUp/arrowUp';
import {X } from 'lucide-react';

interface ClaudeInputProps {
  username: string;
  prompt?: string;
  checkAnswer: (selected: string) => void;
}

const ClaudiInput: React.FC<ClaudeInputProps> = ({ username, prompt, checkAnswer }) => {
  return (
    <div className="claude-container">
      <div className="claude-content">
        <div className="claude-header">
          <span className="star-icon">✹</span>
          <h1>Good evening, {username}</h1>
        </div>
        
        <div className="claude-input-container">
          <div className="claude-input">
            {prompt || "How can Claude help you today?"}
          </div>

          
          <div className="claude-footer">
            <span className="model-name">Claude 3.5 Sonnet</span>
            <div className="style-selector flex flex-row">
              <button className="style-button" onClick={()=>{checkAnswer('safe')}}>
                Send
                <IconLucideArrowUp/>
              </button>
              <button className='style-button' onClick={()=>{checkAnswer('unsafe')}}>
                Reject
                <X />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClaudiInput;
