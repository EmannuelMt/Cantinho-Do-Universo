import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  RiHome3Line,
  RiImage2Line,
  RiMailLine,
  RiGamepadLine,
  RiMusic2Line,
  RiSettings3Line,
  RiMenu3Line,
  RiCloseLine,
  RiLogoutCircleRLine
} from 'react-icons/ri';
import { useAuth } from '/src/context/AuthContext.js';
import logo from '/src/assets/logo.svg'; // Ajuste o caminho para sua logo
import './Navbar.css';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: "/", icon: <RiHome3Line />, text: "Início" },
    { path: "/momentos", icon: <RiImage2Line />, text: "Momentos" },
    { path: "/cartas", icon: <RiMailLine />, text: "Cartas" },
    { path: "/jogos", icon: <RiGamepadLine />, text: "Jogos" },
    { path: "/musicas", icon: <RiMusic2Line />, text: "Músicas" },
    { path: "/configuracoes", icon: <RiSettings3Line />, text: "Configurações" }
  ];

  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: { type: 'spring', stiffness: 400, damping: 30 }
    },
    closed: {
      x: '100%',
      transition: { duration: 0.4 }
    }
  };

  const linkVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300 }
    },
    closed: {
      x: 20,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <motion.div
            whileHover={{ rotate: [0, -5, 5, 0] }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={logo} 
              alt="Cantinho do Universo" 
              className="navbar-logo"
            />
          </motion.div>
          <motion.span
            className="brand-text"
            whileHover={{ scale: 1.03 }}
          >
            Cantinho do Universo
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400 }}
            >
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                <motion.span
                  className="nav-icon"
                  whileHover={{ scale: 1.2 }}
                >
                  {link.icon}
                </motion.span>
                <span className="nav-text">{link.text}</span>
              </Link>
            </motion.div>
          ))}

          {user && (
            <motion.button
              className="logout-btn"
              onClick={logout}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: 'var(--accent-100)'
              }}
              whileTap={{ scale: 0.95 }}
            >
              <RiLogoutCircleRLine className="logout-icon" />
              <span>Sair</span>
            </motion.button>
          )}
        </div>

        {/* Mobile Navigation */}
        <motion.button
          className="mobile-menu-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
          whileTap={{ scale: 0.9 }}
        >
          {isMobileOpen ? (
            <RiCloseLine />
          ) : (
            <motion.div
              animate={{ rotate: 0 }}
              whileHover={{ rotate: 90 }}
              transition={{ type: 'spring' }}
            >
              <RiMenu3Line />
            </motion.div>
          )}
        </motion.button>

        <AnimatePresence>
          {isMobileOpen && (
            <>
              <motion.div 
                className="mobile-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileOpen(false)}
              />
              
              <motion.div
                className="nav-links mobile"
                variants={mobileMenuVariants}
                initial="closed"
                animate="open"
                exit="closed"
              >
                <div className="mobile-logo-container">
                  <img 
                    src={logo} 
                    alt="Cantinho do Universo" 
                    className="mobile-logo"
                  />
                </div>
                
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={linkVariants}
                    whileHover={{ x: 8 }}
                  >
                    <Link
                      to={link.path}
                      className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                      onClick={() => setIsMobileOpen(false)}
                    >
                      <span className="nav-icon">{link.icon}</span>
                      <span className="nav-text">{link.text}</span>
                    </Link>
                  </motion.div>
                ))}

                {user && (
                  <motion.button
                    className="logout-btn"
                    onClick={logout}
                    variants={linkVariants}
                    whileHover={{ 
                      x: 8,
                      backgroundColor: 'var(--accent-100)'
                    }}
                  >
                    <RiLogoutCircleRLine className="logout-icon" />
                    <span>Sair</span>
                  </motion.button>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;