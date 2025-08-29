import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
  RiHome3Fill,
  RiHome3Line,
  RiImage2Fill,
  RiImage2Line,
  RiMailFill,
  RiMailLine,
  RiGamepadFill,
  RiGamepadLine,
  RiMusic2Fill,
  RiMusic2Line,
  RiSettings3Fill,
  RiSettings3Line,
  RiMenu3Line,
  RiCloseLine,
  RiLogoutCircleRLine,
  RiUser3Line,
  RiUser3Fill,
  RiHeart2Fill,
  RiHeart2Line
} from 'react-icons/ri';
import {
  IoSparkles,
  IoHeart,
  IoHeartOutline,
  IoMenu,
  IoClose
} from 'react-icons/io5';
import {
  BiSolidHome,
  BiHome,
  BiSolidImage,
  BiImage,
  BiSolidEnvelope,
  BiEnvelope,
  BiSolidGame,
  BiGame,
  BiSolidMusic,
  BiMusic,
  BiSolidCog,
  BiCog,
  BiSolidUser,
  BiUser
} from 'react-icons/bi';
import { useAuth } from '/src/context/AuthContext.js';
import logo from '/src/assets/logo.svg'; // Ajuste o caminho para sua logo
import './Navbar.css';

const Navbar = () => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeHover, setActiveHover] = useState(null);
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
    { 
      path: "/", 
      icon: <RiHome3Line />, 
      iconActive: <RiHome3Fill />,
      text: "Início",
      color: "var(--purple-400)"
    },
    { 
      path: "/momentos", 
      icon: <RiImage2Line />, 
      iconActive: <RiImage2Fill />,
      text: "Momentos",
      color: "var(--pink-400)"
    },
    { 
      path: "/cartas", 
      icon: <RiMailLine />, 
      iconActive: <RiMailFill />,
      text: "Cartas",
      color: "var(--blue-400)"
    },
    { 
      path: "/jogos", 
      icon: <RiGamepadLine />, 
      iconActive: <RiGamepadFill />,
      text: "Jogos",
      color: "var(--green-400)"
    },
    { 
      path: "/musicas", 
      icon: <RiMusic2Line />, 
      iconActive: <RiMusic2Fill />,
      text: "Músicas",
      color: "var(--yellow-400)"
    },
    { 
      path: "/perfil", 
      icon: <RiUser3Line />, 
      iconActive: <RiUser3Fill />,
      text: "Perfil",
      color: "var(--cyan-400)"
    },
    { 
      path: "/configuracoes", 
      icon: <RiSettings3Line />, 
      iconActive: <RiSettings3Fill />,
      text: "Configurações",
      color: "var(--gray-400)"
    }
  ];

  const mobileMenuVariants = {
    open: {
      x: 0,
      transition: { 
        type: 'spring', 
        stiffness: 400, 
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1
      }
    },
    closed: {
      x: '100%',
      transition: { 
        duration: 0.4,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const linkVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 300, damping: 20 }
    },
    closed: {
      x: 50,
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="navbar-background"></div>
      
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <motion.div
            className="logo-container"
            whileHover={{ 
              rotate: [0, -5, 5, 0],
              scale: 1.05
            }}
            transition={{ duration: 0.6 }}
          >
            <img 
              src={logo} 
              alt="Cantinho do Universo" 
              className="navbar-logo"
            />
            <motion.span
              className="logo-sparkle"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <IoSparkles />
            </motion.span>
          </motion.div>
          <motion.span
            className="brand-text"
            whileHover={{ scale: 1.03 }}
            transition={{ type: 'spring', stiffness: 400 }}
          >
            Cantinho do Universo
          </motion.span>
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-links desktop">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              className="nav-item"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: 'spring', stiffness: 400 }}
              onHoverStart={() => setActiveHover(link.path)}
              onHoverEnd={() => setActiveHover(null)}
            >
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                style={{
                  '--active-color': link.color
                }}
              >
                <motion.span
                  className="nav-icon"
                  animate={{ 
                    scale: location.pathname === link.path ? 1.2 : 1
                  }}
                  transition={{ type: 'spring', stiffness: 500 }}
                >
                  {location.pathname === link.path ? link.iconActive : link.icon}
                </motion.span>
                <span className="nav-text">{link.text}</span>
                <motion.div 
                  className="nav-indicator"
                  initial={{ scaleX: 0 }}
                  animate={{ 
                    scaleX: location.pathname === link.path ? 1 : 
                           activeHover === link.path ? 0.5 : 0 
                  }}
                  transition={{ type: 'spring', stiffness: 400 }}
                />
              </Link>
            </motion.div>
          ))}

          {user && (
            <motion.div
              className="nav-item"
              variants={itemVariants}
            >
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
            </motion.div>
          )}
        </div>

        {/* User Info (Desktop) */}
        {user && (
          <motion.div 
            className="user-info"
            variants={itemVariants}
          >
            <div className="user-avatar">
              {user.avatar ? (
                <img src={user.avatar} alt={user.name} />
              ) : (
                <RiUser3Line />
              )}
            </div>
            <span className="user-name">{user.name}</span>
          </motion.div>
        )}

        {/* Mobile Navigation Button */}
        <motion.button
          className="mobile-menu-btn"
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          aria-label={isMobileOpen ? "Fechar menu" : "Abrir menu"}
          whileTap={{ scale: 0.9 }}
          variants={itemVariants}
        >
          <AnimatePresence mode="wait">
            {isMobileOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <RiCloseLine />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
                whileHover={{ rotate: 90 }}
              >
                <RiMenu3Line />
              </motion.div>
            )}
          </AnimatePresence>
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
                <div className="mobile-header">
                  <div className="mobile-logo-container">
                    <img 
                      src={logo} 
                      alt="Cantinho do Universo" 
                      className="mobile-logo"
                    />
                    <span className="mobile-brand-text">Cantinho do Universo</span>
                  </div>
                  
                  {user && (
                    <div className="mobile-user-info">
                      <div className="user-avatar">
                        {user.avatar ? (
                          <img src={user.avatar} alt={user.name} />
                        ) : (
                          <RiUser3Line />
                        )}
                      </div>
                      <span className="user-name">{user.name}</span>
                    </div>
                  )}
                </div>
                
                <div className="mobile-links-container">
                  {navLinks.map((link) => (
                    <motion.div
                      key={link.path}
                      className="mobile-nav-item"
                      variants={linkVariants}
                      whileHover={{ x: 8 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Link
                        to={link.path}
                        className={`mobile-nav-link ${location.pathname === link.path ? 'active' : ''}`}
                        onClick={() => setIsMobileOpen(false)}
                        style={{
                          '--active-color': link.color
                        }}
                      >
                        <span className="nav-icon">
                          {location.pathname === link.path ? link.iconActive : link.icon}
                        </span>
                        <span className="nav-text">{link.text}</span>
                        <motion.div 
                          className="nav-indicator"
                          initial={{ scaleX: 0 }}
                          animate={{ 
                            scaleX: location.pathname === link.path ? 1 : 0 
                          }}
                          transition={{ type: 'spring', stiffness: 400 }}
                        />
                      </Link>
                    </motion.div>
                  ))}

                  {user && (
                    <motion.div
                      className="mobile-nav-item"
                      variants={linkVariants}
                    >
                      <motion.button
                        className="mobile-logout-btn"
                        onClick={() => {
                          logout();
                          setIsMobileOpen(false);
                        }}
                        whileHover={{ x: 8 }}
                      >
                        <RiLogoutCircleRLine className="logout-icon" />
                        <span>Sair</span>
                      </motion.button>
                    </motion.div>
                  )}
                </div>

                <motion.div 
                  className="mobile-footer"
                  variants={linkVariants}
                >
                  <p>Feito com <RiHeart2Fill className="heart-icon" /> para você</p>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;