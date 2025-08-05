import { useContext } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";

import './Settings.css';

const Settings = () => {
  const { theme, themeName, changeTheme, themes } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);

  // Verificação de segurança
  if (!themes || !changeTheme) {
    return <div>Carregando configurações...</div>;
  }

  return (
    <div className="settings-page" style={{ color: theme.colors.text }}>
      <h1>Configurações do Nosso Universo</h1>

      <div
        className="settings-section"
        style={{ backgroundColor: theme.colors.card }}
      >
        <h2>Tema</h2>
        <div className="theme-options">
          {Object.keys(themes).map((key) => (
            <button
              key={key}
              className={`theme-btn ${themeName === key ? 'active' : ''}`}
              onClick={() => changeTheme(key)}
              style={{
                backgroundColor: themes[key].colors.primary,
                color: themes[key].colors.text
              }}
            >
              {themes[key].name}
            </button>
          ))}
        </div>
      </div>

      <div
        className="settings-section"
        style={{ backgroundColor: theme.colors.card }}
      >
        <h2>Conta</h2>
        <p>Logado como: <strong>{user?.name || 'Visitante'}</strong></p>
        <button
          onClick={logout}
          className="logout-btn"
          style={{ backgroundColor: theme.colors.accent }}
        >
          Sair
        </button>
      </div>

      <div
        className="settings-section"
        style={{ backgroundColor: theme.colors.card }}
      >
        <h2>Sobre Nós</h2>
        <p>Este é nosso espaço especial desde {new Date().getFullYear()} ❤️</p>
      </div>
    </div>
  );
};

export default Settings;