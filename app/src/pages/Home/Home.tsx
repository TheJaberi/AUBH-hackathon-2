import React from 'react';
import robotVideo from '../../assets/hp_robot.mp4';
import { useTheme } from '../../context/ThemeContext';
import Fly from '../../components/Fly/Fly';
import spaceboy from '../../assets/spaceboy.png';
import privacy_security from '../../assets/privacy_security.png';
import bias from '../../assets/bias.png';
import manipulation from '../../assets/manipulation.png';
import the_path from '../../assets/the_path.png';
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
            <img src={spaceboy} alt="Space Boy" className="diagonal-image" />
            <div className="image-overlay">Future of Learning</div>
          </div>
          <div className="diagonal-text">
            <h2>Understand Responsible AI</h2>
            <p className={`diagonal-description ${isDark ? 'dark' : 'light'}`}>
              Embark on a journey where you explore how you can keep yourself safe as you are using AI, wether it be prompting, seeing responses, or evaluating results.
            </p>
          </div>
        </div>
      </section>

      {/* Image Grid Showcase */}
      <section className="showcase-grid">
        <div className="grid-container">
          <div className="showcase-item">
        <div className="showcase-image-placeholder">
          <img src={privacy_security} alt="Privacy and Security" />
          <div className="hover-content">
            <h3>Privacy & Security</h3>
            <p>Learn how AI handles data securely and maintains privacy.</p>
          </div>
        </div>
          </div>
          <div className="showcase-item">
        <div className="showcase-image-placeholder">
          <img src={bias} alt="Bias" />
          <div className="hover-content">
            <h3>Bias</h3>
            <p>Understand bias in AI systems and how to address it effectively.</p>
          </div>
        </div>
          </div>
          <div className="showcase-item">
        <div className="showcase-image-placeholder">
          <img src={manipulation} alt="Manipulation" />
          <div className="hover-content">
            <h3>Manipulation</h3>
            <p>Discover how AI can influence decisions and the ethical concerns.</p>
          </div>
        </div>
          </div>
        </div>
      </section>

      {/* Circular Feature Section */}
      <section className="circular-section">
        <div className="circle-container">
          <div className="circular-image-holder">
        <img src={the_path} alt="The Path" className="circular-image" />
        <div className="rotating-text">
          <span>Interactive • Engaging • Modern • Innovative</span>
        </div>
          </div>
          <div className="circular-content">
        <h2>Experience AI Learning</h2>
        <p className={`circular-description ${isDark ? 'dark' : 'light'}`}>
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
