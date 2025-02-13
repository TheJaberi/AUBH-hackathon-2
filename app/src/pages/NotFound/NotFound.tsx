import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import './NotFound.css'; // Import the CSS file for animations

const NotFound: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center justify-center h-screen text-center relative overflow-hidden ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <h1 className={`z-10 ${theme === 'dark' ? 'text-white' : 'text-black'} text-4xl md:text-6xl lg:text-8xl`}>404 - Page Not Found</h1>
      <div className={`absolute top-0 left-0 w-full h-full ${theme === 'dark' ? 'bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500'} animate-gradient`}></div>
    </div>
  );
};

export default NotFound;
