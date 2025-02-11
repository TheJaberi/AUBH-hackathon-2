import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useTheme } from '../../context/ThemeContext';
import './MainLayout.css';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { isDark } = useTheme();

  return (
    <div className={`welcome-container ${isDark ? 'dark' : 'light'}`}>
      <Navbar />
      {children}
    </div>
  );
};

export default MainLayout;
