import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  FaHome, 
  FaCalendarAlt, 
  FaImages, 
  FaMusic, 
  FaEnvelope, 
  FaGamepad,
  FaUser,
  FaHeart
} from 'react-icons/fa';
import { GiLovers } from 'react-icons/gi';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { 
      path: '/', 
      label: 'Home', 
      icon: <FaHome size={20} />,
      activeIcon: <FaHome size={20} className="active-icon" />
    },
    { 
      path: '/momentos', 
      label: 'Momentos', 
      icon: <FaCalendarAlt size={20} />,
      activeIcon: <FaCalendarAlt size={20} className="active-icon" />
    },
    { 
      path: '/album', 
      label: 'Álbum', 
      icon: <FaImages size={20} />,
      activeIcon: <FaImages size={20} className="active-icon" />
    },
    { 
      path: '/musicas', 
      label: 'Músicas', 
      icon: <FaMusic size={20} />,
      activeIcon: <FaMusic size={20} className="active-icon" />
    },
    { 
      path: '/cartas', 
      label: 'Cartas', 
      icon: <FaEnvelope size={20} />,
      activeIcon: <FaEnvelope size={20} className="active-icon" />
    },
    { 
      path: '/jogos', 
      label: 'Jogos', 
      icon: <FaGamepad size={20} />,
      activeIcon: <FaGamepad size={20} className="active-icon" />
    },
    { 
      path: '/perfil', 
      label: 'Perfil', 
      icon: <FaUser size={20} />,
      activeIcon: <FaUser size={20} className="active-icon" />
    }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        {/* Logo */}
        <div className="nav-logo">
          <GiLovers size={24} className="logo-icon" />
          <span className="logo-text">Cantinho</span>
        </div>

        {/* Itens de Navegação */}
        <div className="nav-items">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`nav-item ${isActive ? 'active' : ''}`}
              >
                <div className="nav-icon-wrapper">
                  {isActive ? item.activeIcon : item.icon}
                  {isActive && <div className="active-indicator"></div>}
                </div>
                <span className="nav-label">{item.label}</span>
                
                {isActive && (
                  <div className="nav-tooltip">
                    {item.label}
                  </div>
                )}
              </Link>
            );
          })}
        </div>

        {/* Footer da Navegação */}
        <div className="nav-footer">
          <div className="nav-love">
            <FaHeart size={14} className="love-icon" />
            <span>Feito com amor</span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;