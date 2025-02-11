import './App.css'
import React from 'react';

const WelcomePage = () => {
  const [isDark, setIsDark] = React.useState(true);

  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return React.createElement('div', { className: `welcome-container ${isDark ? 'dark' : 'light'}` },
    React.createElement('nav', { className: `nav-bar ${isDark ? 'dark' : 'light'}` },
      React.createElement('div', { className: 'logo' }, 'AI Learning'),
      React.createElement('div', { className: `nav-links ${isDark ? 'dark' : 'light'}` },
        React.createElement('a', { href: '#home' }, 'Home'),
        React.createElement('a', { href: '#courses' }, 'Courses'),
        React.createElement('a', { href: '#about' }, 'About'),
        React.createElement('a', { href: '#contact' }, 'Contact'),
        React.createElement('button', {
          className: 'theme-toggle',
          onClick: toggleTheme
        }, isDark ? '☀️' : '🌙')
      )
    ),
    React.createElement('div', { className: 'main-content' },
      React.createElement('h1', null, 'Welcome to AI Learning'),
      React.createElement('p', { className: `subtitle ${isDark ? 'dark' : 'light'}` },
        'Discover the fascinating world of artificial intelligence through our interactive learning platform'
      ),
      React.createElement('div', { className: 'circle-grid' },
        ['🏠', '📚', '⚙️', '👤', '📖', '🔧'].map((emoji, index) =>
          React.createElement('div', { className: 'circle-item', key: index },
            React.createElement('div', { className: `circle circle-${index + 1}` }, emoji)
          )
        )
      ),
      React.createElement('div', { className: 'button-group' },
        React.createElement('button', { className: 'btn btn-primary' }, 'Get Started'),
        React.createElement('button', { className: `btn btn-secondary ${isDark ? 'dark' : 'light'}` }, 'Learn More')
      )
    )
  );
};

export default WelcomePage;
