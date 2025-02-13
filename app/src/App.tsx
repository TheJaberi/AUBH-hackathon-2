import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Learning from './pages/Learning/Learning';
import './App.css';
import Privacy from './pages/Learning/Privacy/privacy';
import Bias from './pages/Learning/Bias/bias';
import NotFound from './pages/NotFound/NotFound';


const App: React.FC = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <MainLayout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/learning" element={<Learning />} />
            <Route path ="/learning/privacy" element={<Privacy />} />
            <Route path ="/learning/bias" element={<Bias />} />
            <Route path="*" element={<NotFound />} />

          </Routes>
        </MainLayout>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
