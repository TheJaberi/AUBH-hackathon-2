import React, { useEffect } from 'react';
import robotVideo from '../../assets/hp_robot.mp4';
import { useTheme } from '../../context/ThemeContext';
import Fly from '../../components/Fly/Fly';
import AnimatedBackground from '../../components/AnimatedBackground/AnimatedBackground';
import './Home.css';

const Home: React.FC = () => {
  const { isDark } = useTheme();

  useEffect(() => {
    const sections = document.querySelectorAll('.home-fade-in, .topic-card, .showcase-item, .diagonal-content');

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

      {/* Hero Section */}
      <section className="hero-section">
        <div className="content-wrap home-fade-in">
          <h1 className="home-title">Welcome to GenRes</h1>
          <p className={`home-subtitle ${isDark ? 'dark' : 'light'}`}>
            Discover the fascinating world of artificial intelligence through our interactive learning platform.
          </p>

          <div className="video-holder parallax-element">
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
        </div>
      </section>

      {/* Diagonal Split Section */}
      <section className="diagonal-section">
        <div className="diagonal-content slide-from-left">
          <div className="diagonal-image-placeholder">
            <div className="image-overlay">Future of Learning</div>
          </div>
          <div className="diagonal-text">
            <h2>Transform Your Understanding</h2>
            <p className={`diagonal-description ${isDark ? 'dark' : 'light'}`}>
              Embark on a journey through the complexities of AI, guided by cutting-edge 
              technology and expert insights. Our platform adapts to your learning style,
              ensuring a personalized experience that evolves with you.
            </p>
          </div>
        </div>
      </section>

      {/* Image Grid Showcase */}
      <section className="showcase-grid">
        <div className="grid-container">
          {[1, 2, 3, 4, 5, 6].map((num) => (
            <div key={num} className={`showcase-item item-${num}`}>
              <div className="showcase-image-placeholder">
                <div className="hover-content">
                  <h3>Feature {num}</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Circular Feature Section */}
      <section className="circular-section">
        <div className="circle-container">
          <div className="circle-image-placeholder">
            <div className="rotating-text">
              <span>Interactive • Engaging • Modern • Innovative • </span>
            </div>
          </div>
          <div className="circle-content">
            <h2>Experience AI Learning</h2>
            <p className={`circle-description ${isDark ? 'dark' : 'light'}`}>
              Our platform combines visual learning with hands-on practice,
              creating an immersive environment where complex concepts become
              clear and engaging. Watch as theory transforms into practical understanding.
            </p>
          </div>
        </div>
      </section>

      {/* Metrics Section */}
      <section className="metrics-section">
        <div className="metrics-grid">
          {['Users', 'Courses', 'Success Rate', 'Hours Saved'].map((metric, index) => (
            <div key={metric} className="metric-card">
              <h3>95%</h3>
              <p>{metric}</p>
              <div className={`metric-background bg-${index + 1}`}></div>
            </div>
          ))}
        </div>
      </section>

      {/* Topic Cards Section */}
      <section className="topic-cards-section">
        {topics.map((topic, index) => (
          <div key={index} className={`topic-card ${topic.side}`}>
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="cta-section home-fade-in">
        <div className="cta-content">
          <h2>Ready to Begin?</h2>
          <p className={`cta-description ${isDark ? 'dark' : 'light'}`}>
            Join thousands of learners who have already transformed their understanding of AI.
          </p>
          <button className={`cta-button ${isDark ? 'dark' : 'light'}`}>
            Start Your Journey
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
