import React from 'react';

const ThemeToggle = ({ isDarkTheme, toggleTheme }) => {
  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      {isDarkTheme ? 'Light Mode' : 'Dark Mode'}
    </button>
  );
};

export default ThemeToggle;