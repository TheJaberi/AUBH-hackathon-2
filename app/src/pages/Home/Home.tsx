import React from 'react';
import robotVideo from '../../assets/hp_robot.mp4';
import { useTheme } from '../../context/ThemeContext';
import Fly from '../../components/Fly/Fly';
import './Home.css';

const Home: React.FC = () => {
  const { isDark } = useTheme();

  const topics = [
    { title: 'Privacy & Security', description: 'Learn how AI handles data securely and maintains privacy.' },
    { title: 'Bias', description: 'Understand bias in AI systems and how to address it effectively.' },
    { title: 'Manipulation', description: 'Discover how AI can influence decisions and the ethical concerns.' },
    { title: 'Case Studies', description: 'Explore real-world examples of AI applications and their impact.' }
  ];

  return (
    <div className="home-main-content">
      <Fly isDark={isDark} />

      {/* Hero Section */}
      <section className="hero-section">
        <div className="content-wrap">
          <h1 className="home-title">Welcome to GenRes</h1>
          <p className={`home-subtitle ${isDark ? 'dark' : 'light'}`}>
            Discover the fascinating world of artificial intelligence through our interactive learning platform.
          </p>

          <div className="video-holder">
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
        <div className="diagonal-content">
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
            <div key={num} className="showcase-item">
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
              <span>Interactive • Engaging • Modern • Innovative</span>
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
          <div key={index} className="topic-card">
            <h3>{topic.title}</h3>
            <p>{topic.description}</p>
          </div>
        ))}
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
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
