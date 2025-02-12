import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import man1 from '../../assets/man1.jpg';
import man2 from '../../assets/man2.jpg';
import man3 from '../../assets/man3.jpg';
import girl1 from '../../assets/girl1.jpg';
import './About.css';

const About: React.FC = () => {
  const { isDark } = useTheme();

  return (
    <div className="about-content">
      <section className="our-team-section">
        <h2>Our Team</h2>
        <div className="card-container">
          <div className="card card-square">
            <img src={man1} alt="Team Member 1" />
          </div>
          <div className="card card-rectangle">
            <div className="card-content">
              <h3>Team Member 1</h3>
              <p>Role and description for team member 1.</p>
            </div>
          </div>
          <div className="card card-square">
            <img src={man2} alt="Team Member 2" />
          </div>
          <div className="card card-rectangle">
            <div className="card-content">
              <h3>Team Member 2</h3>
              <p>Role and description for team member 2.</p>
            </div>
          </div>
          <div className="card card-square">
            <img src={man3} alt="Team Member 3" />
          </div>
          <div className="card card-rectangle">
            <div className="card-content">
              <h3>Team Member 3</h3>
              <p>Role and description for team member 3.</p>
            </div>
          </div>
          <div className="card card-square">
            <img src={girl1} alt="Team Member 4" />
          </div>
          <div className="card card-rectangle">
            <div className="card-content">
              <h3>Team Member 4</h3>
              <p>Role and description for team member 4.</p>
            </div>
          </div>
        </div>
      </section>
      <h1>About AI Learning</h1>
      <div className={`about-section ${isDark ? 'dark' : 'light'}`}>
        <h2>Our Mission</h2>
        <p>
          We believe in making artificial intelligence education accessible to everyone. 
          Our platform provides comprehensive learning resources, interactive tutorials, 
          and hands-on projects to help you master AI concepts.
        </p>
      </div>

      <div className={`about-section ${isDark ? 'dark' : 'light'}`}>
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎯</span>
            <h3>Structured Learning</h3>
            <p>Carefully crafted learning paths for beginners to advanced learners</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">💡</span>
            <h3>Practical Experience</h3>
            <p>Real-world projects and hands-on exercises</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">👥</span>
            <h3>Community Support</h3>
            <p>Learn alongside peers and get help from experts</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <h3>Career Growth</h3>
            <p>Industry-relevant skills and certification programs</p>
          </div>
        </div>
      </div>

      <div className={`about-section ${isDark ? 'dark' : 'light'}`}>
        <h2>Get Started Today</h2>
        <p>
          Join thousands of learners who have already begun their journey into AI. 
          Whether you're looking to switch careers, upskill, or simply explore the 
          fascinating world of artificial intelligence, we're here to guide you every 
          step of the way.
        </p>
        <button className="btn btn-primary">Join Our Community</button>
      </div>
    </div>
  );
};

export default About;
