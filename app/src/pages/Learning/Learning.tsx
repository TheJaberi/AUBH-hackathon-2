import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import NameInput from '../../components/NameInput/NameInput';
import './Learning.css';

const learningPaths = [
  {
    title: 'AI Fundamentals',
    level: 'Beginner',
    duration: '8 weeks',
    topics: ['Introduction to AI', 'Machine Learning Basics', 'Neural Networks', 'Python for AI'],
    icon: '🤖'
  },
  {
    title: 'Machine Learning Specialist',
    level: 'Intermediate',
    duration: '12 weeks',
    topics: ['Advanced ML Algorithms', 'Deep Learning', 'Computer Vision', 'NLP'],
    icon: '🧠'
  },
  {
    title: 'AI Applications',
    level: 'Advanced',
    duration: '10 weeks',
    topics: ['AI in Business', 'AI Ethics', 'Project Development', 'Deployment'],
    icon: '🚀'
  },
  {
    title: 'Data Science for AI',
    level: 'Intermediate',
    duration: '10 weeks',
    topics: ['Data Analysis', 'Statistics', 'Data Visualization', 'Big Data'],
    icon: '📊'
  }
];

const Learning: React.FC = () => {
  const { isDark } = useTheme();
  const [userName, setUserName] = useState<string | null>(null);

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
    <div className="learning-content">
      <h1>Learning Paths</h1>
      <p className={`description ${isDark ? 'dark' : 'light'}`}>
        Choose your AI learning journey from our carefully crafted paths. Each path is designed 
        to take you from concept to mastery with hands-on projects and expert guidance.
      </p>

      <div className="path-grid">
        {learningPaths.map((path, index) => (
          <div key={index} className={`path-card ${isDark ? 'dark' : 'light'}`}>
            <div className="path-icon">{path.icon}</div>
            <h2>{path.title}</h2>
            <div className="path-details">
              <span className="level">Level: {path.level}</span>
              <span className="duration">Duration: {path.duration}</span>
            </div>
            <div className="topics">
              <h3>What you'll learn:</h3>
              <ul>
                {path.topics.map((topic, topicIndex) => (
                  <li key={topicIndex}>{topic}</li>
                ))}
              </ul>
            </div>
            <button className="btn btn-primary">Start Learning</button>
          </div>
        ))}
      </div>

      <div className={`cta-section ${isDark ? 'dark' : 'light'}`}>
        <h2>Ready to Begin Your AI Journey?</h2>
        <p>
          Our learning paths are designed to help you achieve your goals, whether you're 
          starting from scratch or looking to specialize in a specific area of AI.
        </p>
        <div className="button-group">
          <button className="btn btn-primary">View All Paths</button>
          <button className={`btn btn-secondary ${isDark ? 'dark' : 'light'}`}>Get Advice</button>
        </div>
      </div>
    </div>
  );
};

export default Learning;
