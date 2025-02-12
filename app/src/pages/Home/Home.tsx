import React, { useEffect } from 'react';
import robotVideo from '../../assets/hp_robot.mp4';
import { useTheme } from '../../context/ThemeContext';
import Fly from '../../components/Fly/Fly';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import './Home.css';

const Home: React.FC = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    const sections = document.querySelectorAll('.home-fade-in, .topic-card');

    const handleScroll = () => {
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerPoint = window.innerHeight * 0.85;

        if (sectionTop < triggerPoint) {
          section.classList.add('visible');
        } else {
          section.classList.remove('visible');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Trigger on page load

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topics = [
    { title: 'Privacy & Security', description: 'Learn how AI handles data securely and maintains privacy.', side: 'slide-from-left' },
    { title: 'Bias', description: 'Understand bias in AI systems and how to address it effectively.', side: 'slide-from-right' },
    { title: 'Manipulation', description: 'Discover how AI can influence decisions and the ethical concerns.', side: 'slide-from-left' },
    { title: 'Case Studies', description: 'Explore real-world examples of AI applications and their impact.', side: 'slide-from-right' }
  ];

  return (
    <div className="home-main-content">
      <AnimatedBackground isDark={isDark} />
      <Fly isDark={isDark} />

      <section className="home-fade-in">
        <h1 className="home-title">Welcome to GenRes</h1>
        <p className={`home-subtitle ${isDark ? 'dark' : 'light'}`}>
          Discover the fascinating world of artificial intelligence through our interactive learning platform.
        </p>

        <div className="video-holder home-fade-in">
          <video autoPlay loop muted className="video-content">
            <source src={robotVideo} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        <div className="home-button-group">
          <button className={`home-btn home-btn-primary ${isDark ? '' : 'light'}`}>
            Get Started
          </button>
          <button className={`home-btn home-btn-secondary ${isDark ? 'dark' : 'light'}`}>
            Learn More
          </button>
        </div>
      </section>

      <section className="home-fade-in">
        <div className="home-image-placeholder">Image Placeholder 1</div>
        <p className={`home-description ${isDark ? 'dark' : 'light'}`}>
          Enhance your learning experience with interactive AI modules designed for modern thinkers.
        </p>
      </section>

      <section className="home-fade-in">
        <div className="home-image-placeholder">Image Placeholder 2</div>
        <p className={`home-description ${isDark ? 'dark' : 'light'}`}>
          Track your progress, analyze data, and unlock new achievements as you master AI concepts.
        </p>
      </section>

      {/* --- Topic Cards Section --- */}
      <section className="topic-cards-section">
        {topics.map((topic, index) => (
          <div key={index} className={`topic-card ${topic.side}`}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;
