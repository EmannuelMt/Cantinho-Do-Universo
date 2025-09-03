import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import './Header.css';

const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <h1>💖 Cantinho do Universo</h1>
          <p>Nosso espaço especial</p>
        </div>
        
        {user && (
          <div className="user-menu">
            <span>Olá, {user.nome}</span>
            <button onClick={logout} className="logout-btn">
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;