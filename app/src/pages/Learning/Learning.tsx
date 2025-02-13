import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import NameInput from '../../components/NameInput/NameInput';
import './Learning.css';
import Privacy from '../../assets/privacy.webp';
import Bias from '../../assets/bias.webp';
import Manipulation from '../../assets/manipulation.webp';
import CaseStudy from '../../assets/caseStudies.webp';

const learningPaths = [
  {
    title: 'Privacy',
    level: 'Beginner',
    duration: '8 weeks',
    topics: ['Introduction to AI', 'Machine Learning Basics', 'Neural Networks', 'Python for AI'],
    icon: '🤖',
    image: Privacy,
    completion: 75 // Example completion percentage
  },
  {
    title: 'Bias',
    level: 'Intermediate',
    duration: '12 weeks',
    topics: ['Advanced ML Algorithms', 'Deep Learning', 'Computer Vision', 'NLP'],
    icon: '🧠',
    image: Bias,
    completion: 50 // Example completion percentage
  },
  {
    title: 'Manipulation',
    level: 'Advanced',
    duration: '10 weeks',
    topics: ['AI in Business', 'AI Ethics', 'Project Development', 'Deployment'],
    icon: '🚀',
    image: Manipulation,
    completion: 30 // Example completion percentage
  },
  {
    title: 'Case Study',
    level: 'Intermediate',
    duration: '10 weeks',
    topics: ['Data Analysis', 'Statistics', 'Data Visualization', 'Big Data'],
    icon: '📊',
    image: CaseStudy,
    completion: 90 // Example completion percentage
  }
];

const Learning: React.FC = () => {
  const { isDark } = useTheme();
  const [userName, setUserName] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedName = localStorage.getItem('userName');
    if (storedName) {
      setUserName(storedName);
    }
  }, []);

  const handleNameSubmit = (name: string) => {
    localStorage.setItem('userName', name);
    setUserName(name);
  };

  if (!userName) {
    return <NameInput onSubmit={handleNameSubmit} />;
  }

  return (
    <>
      <p className="text-center text-base font-semibold text-purple-600 !my-4 !p-2 bg-gray-800 rounded-lg shadow-md w-4/5 !mx-auto">
        Welcome to the AI Journey! Choose a learning path to continue.
      </p>
      <div className="learning-container">
        {learningPaths.map((path, index) => (
          <div
            key={index}
            className={`path-card ${isDark ? 'dark' : 'light'}`}
            onClick={() => navigate(`/learning/${path.title.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`)}
          >
            <img src={path.image} alt={path.title} />
            <div className="completion-circle">{path.title}</div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Learning;
