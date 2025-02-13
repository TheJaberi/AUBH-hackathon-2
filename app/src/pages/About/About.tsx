import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import man1 from '../../assets/man1.jpg';
import man2 from '../../assets/man2.jpg';
import man3 from '../../assets/man3.jpg';
import girl1 from '../../assets/girl1.jpg';
import './About.css';

const About: React.FC = () => {
  const { isDark } = useTheme();
  const themeClass = isDark ? "dark" : "light";

  return (
    <div className="about-content">
      {/* Our Team Section */}
      <section className={`our-team-section ${themeClass}`}>
        <h2>Our Team</h2>
        <div className="team-container">
          <div className={`team-card ${themeClass}`}>
            <img src={man1} alt="Team Member 1" />
            <div className="team-info">
              <h3>Sayed Hesham Hussain</h3>
              <p>Role and description for team member 1.</p>
            </div>
          </div>
          <div className={`team-card ${themeClass}`}>
            <img src={man2} alt="Team Member 2" />
            <div className="team-info">
              <h3>Adnan Jabri</h3>
              <p>Role and description for team member 2.</p>
            </div>
          </div>
          <div className={`team-card ${themeClass}`}>
            <img src={man3} alt="Team Member 3" />
            <div className="team-info">
              <h3>Yousif Jawad</h3>
              <p>Role and description for team member 3.</p>
            </div>
          </div>
          <div className={`team-card ${themeClass}`}>
            <img src={girl1} alt="Team Member 4" />
            <div className="team-info">
              <h3>Reem Alhalwachi</h3>
              <p>Role and description for team member 4.</p>
            </div>
          </div>
        </div>
      </section>

      {/* About AI Learning Section (Restored) */}
      <h1>About GenRes</h1>
      <div className={`about-section ${themeClass}`}>
        <h2>Our Mission</h2>
        <p>
        At GenRes, we empower young minds to explore AI responsibly through engaging games and interactive challenges. Our mission is to make AI ethics fun, accessible, and impactful, helping future innovators think critically, navigate AI safely, and make ethical choices in the digital world. 🚀✨
        </p>
      </div>

      <div className={`about-section ${themeClass}`}>
        <h2>Why Choose Us?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎮</span>
            <h3>Learn Through Play</h3>
            <p>We make AI ethics fun with interactive games and challenges, turning learning into an exciting adventure.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🛡️</span>
            <h3>Safe & Responsible AI</h3>
            <p>We teach ethical AI usage, helping you understand bias, privacy, and safe interactions with AI-powered tools.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🧠</span>
            <h3>Critical Thinking & Problem-Solving</h3>
            <p>Through real-world scenarios, we help you analyze, question, and make smart decisions in the AI world.</p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🚀</span>
            <h3>Future-Ready Skills</h3>
            <p>Gain essential digital and ethical skills that prepare you to use and create AI responsibly for the future.</p>
          </div>
        </div>
      </div>

      <div className={`about-section ${themeClass}`}>
        <h2>Get Started Today</h2>
        <p>
    Join <strong>GenRes</strong> and embark on an exciting journey into <strong>AI ethics and responsible AI use</strong>!  
    Through <strong>interactive games, challenges, and real-world scenarios</strong>, you’ll learn how to  
    <strong>navigate AI safely, think critically, and make ethical choices</strong>—all while having fun!  
</p>

<p>
    🌟 <strong>Play. Learn. Grow.</strong> The future of AI starts with you!  
</p>

<p>
    <strong>Ready to begin?</strong> Click below to start your adventure!  
</p>

        <button className="btn btn-primary">🎮 Start Now</button>
      </div>
    </div>
  );
};

export default About;
