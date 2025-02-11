import React, { useState } from 'react';
import './NameInput.css';
import { useTheme } from '../../context/ThemeContext';

interface NameInputProps {
  onSubmit: (name: string) => void;
}

const NameInput: React.FC<NameInputProps> = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const { isDark } = useTheme();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim());
    }
  };

  return (
    <div className="name-input-overlay">
      <div className={`name-input-modal ${isDark ? 'dark' : 'light'}`}>
        <h2>Welcome to AI Learning!</h2>
        <p>Please enter your name to get started on your learning journey.</p>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className={`name-input ${isDark ? 'dark' : 'light'}`}
            autoFocus
          />
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={!name.trim()}
          >
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};

export default NameInput;
