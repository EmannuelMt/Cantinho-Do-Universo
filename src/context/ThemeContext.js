import React, { createContext, useState } from 'react';

export const themes = {
  light: {
    name: 'Claro',
    colors: {
      primary: '#9c27b0',
      secondary: '#7b1fa2',
      background: '#f5f5f5',
      text: '#333',
      card: '#ffffff',
    },
  },
  dark: {
    name: 'Escuro',
    colors: {
      primary: '#7b1fa2',
      secondary: '#4a148c',
      background: '#121212',
      text: '#f5f5f5',
      card: '#1e1e1e',
    },
  },
};

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(themes.dark);

  const changeTheme = (themeName) => {
    setTheme(themes[themeName]);
  };

  return React.createElement(
    ThemeContext.Provider,
    { value: { theme, changeTheme, themes } },
    children
  );
};
