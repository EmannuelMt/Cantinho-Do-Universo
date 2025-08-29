import { useContext, useState } from 'react';
import { ThemeContext } from "../context/ThemeContext";
import { AuthContext } from "../context/AuthContext";
import { 
  FaPalette, 
  FaUser, 
  FaInfoCircle, 
  FaSignOutAlt, 
  FaBell,
  FaSave,
  FaUndo,
  FaMusic,
  FaHeart,
  FaCog,
  FaShieldAlt,
  FaVolumeUp,
  FaLanguage,
  FaMobileAlt,
  FaEnvelope
} from 'react-icons/fa';
import { IoMdColorFill, IoMdCheckmark } from 'react-icons/io';
import { RiUserSettingsLine, RiSparklingFill } from 'react-icons/ri';
import { MdNotificationsActive, MdDataSaverOff, MdAutoAwesome } from 'react-icons/md';
import { BsFillHeartFill, BsMusicPlayer } from 'react-icons/bs';
import { motion, AnimatePresence } from 'framer-motion';
import './Settings.css';

const Settings = () => {
  const { theme, themeName, changeTheme, themes } = useContext(ThemeContext);
  const { user, logout } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState('theme');
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    sounds: true
  });
  const [autoPlay, setAutoPlay] = useState(true);
  const [dataSaver, setDataSaver] = useState(false);
  const [highQuality, setHighQuality] = useState(true);

  // Verificação de segurança
  if (!themes || !changeTheme) {
    return (
      <div className="settings-loading" style={{ color: theme.colors.text }}>
        <motion.div 
          className="loading-spinner"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >Carregando suas configurações...</motion.p>
      </div>
    );
  }

  const handleNotificationChange = (type) => {
    setNotifications(prev => ({
      ...prev,
      [type]: !prev[type]
    }));
  };

  const handleResetSettings = () => {
    setNotifications({
      email: true,
      push: false,
      sounds: true
    });
    setAutoPlay(true);
    setDataSaver(false);
    setHighQuality(true);
  };

  const tabVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      }
    },
    exit: {
      opacity: 0,
      x: -20,
      transition: {
        duration: 0.3,
        ease: "easeIn"
      }
    }
  };

  const tabContent = {
    theme: (
      <motion.div 
        className="tab-content"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="tab-header">
          <motion.div 
            className="tab-icon"
            whileHover={{ rotate: 15 }}
          >
            <IoMdColorFill />
          </motion.div>
          <div>
            <h3>Personalize nossa experiência</h3>
            <p>Escolha como nosso universo musical deve parecer</p>
          </div>
        </div>
        
        <div className="theme-grid">
          {Object.keys(themes).map((key) => (
            <motion.div
              key={key}
              className={`theme-card ${themeName === key ? 'active' : ''}`}
              onClick={() => changeTheme(key)}
              whileHover={{ y: -8, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{
                backgroundColor: themes[key].colors.card,
                border: `3px solid ${themeName === key ? themes[key].colors.primary : 'transparent'}`,
                boxShadow: themeName === key ? `0 10px 30px ${themes[key].colors.primary}30` : '0 6px 20px rgba(0, 0, 0, 0.08)'
              }}
            >
              <motion.div 
                className="theme-preview"
                style={{ 
                  background: `linear-gradient(135deg, ${themes[key].colors.primary} 0%, ${themes[key].colors.accent} 100%)` 
                }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="theme-demo">
                  <motion.div 
                    className="demo-bar" 
                    style={{ backgroundColor: themes[key].colors.background }}
                    animate={{ height: ['20px', '40px', '20px'] }}
                    transition={{ duration: 2, repeat: Infinity, delay: Math.random() * 0.5 }}
                  ></motion.div>
                  <motion.div 
                    className="demo-circle" 
                    style={{ backgroundColor: themes[key].colors.primary }}
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 3, repeat: Infinity, delay: Math.random() * 0.5 }}
                  ></motion.div>
                  <motion.div 
                    className="demo-square" 
                    style={{ backgroundColor: themes[key].colors.accent }}
                    animate={{ rotate: [0, 90, 0] }}
                    transition={{ duration: 4, repeat: Infinity, delay: Math.random() * 0.5 }}
                  ></motion.div>
                </div>
              </motion.div>
              <div className="theme-info">
                <h4>{themes[key].name}</h4>
                <p>{themes[key].description}</p>
              </div>
              {themeName === key && (
                <motion.div 
                  className="theme-badge"
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  style={{ backgroundColor: themes[key].colors.primary }}
                >
                  <IoMdCheckmark /> Ativo
                </motion.div>
              )}
              <motion.div 
                className="theme-hover-indicator"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
              >
                <RiSparklingFill /> Clique para selecionar
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    ),
    
    account: (
      <motion.div 
        className="tab-content"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="tab-header">
          <motion.div 
            className="tab-icon"
            whileHover={{ rotate: 15 }}
          >
            <RiUserSettingsLine />
          </motion.div>
          <div>
            <h3>Sua conta especial</h3>
            <p>Gerencie suas informações pessoais</p>
          </div>
        </div>
        
        <motion.div 
          className="user-profile"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="avatar" 
            style={{ 
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)` 
            }}
            whileHover={{ rotate: [0, -10, 10, 0] }}
            transition={{ duration: 0.5 }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </motion.div>
          <div className="user-info">
            <h4>{user?.name || 'Usuário'}</h4>
            <p>Fazendo parte da nossa história desde {new Date().getFullYear()}</p>
          </div>
        </motion.div>
        
        <div className="account-actions">
          <motion.button 
            className="account-btn"
            whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUser /> Editar Perfil
          </motion.button>
          <motion.button 
            className="account-btn"
            whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaLanguage /> Idioma
          </motion.button>
          <motion.button 
            className="account-btn"
            whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShieldAlt /> Privacidade
          </motion.button>
          <motion.button 
            onClick={logout}
            className="logout-btn"
            style={{ 
              background: `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)` 
            }}
            whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSignOutAlt /> Sair
          </motion.button>
        </div>
      </motion.div>
    ),
    
    preferences: (
      <motion.div 
        className="tab-content"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="tab-header">
          <motion.div 
            className="tab-icon"
            whileHover={{ rotate: 15 }}
          >
            <MdNotificationsActive />
          </motion.div>
          <div>
            <h3>Preferências personalizadas</h3>
            <p>Configure como quer viver nossa experiência</p>
          </div>
        </div>
        
        <div className="preference-group">
          <h4><FaBell /> Notificações</h4>
          <motion.div 
            className="preference-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
              <span className="slider"></span>
            </label>
            <div className="preference-info">
              <span><FaEnvelope /> Notificações por email</span>
              <p>Receba atualizações importantes por email</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="preference-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          >
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
              <span className="slider"></span>
            </label>
            <div className="preference-info">
              <span><FaMobileAlt /> Notificações push</span>
              <p>Receba notificações mesmo quando não estiver usando o app</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="preference-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          >
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={notifications.sounds}
                onChange={() => handleNotificationChange('sounds')}
              />
              <span className="slider"></span>
            </label>
            <div className="preference-info">
              <span><FaVolumeUp /> Sons de notificação</span>
              <p>Reproduzir sons para novas notificações</p>
            </div>
          </motion.div>
        </div>
        
        <div className="preference-group">
          <h4><FaMusic /> Reprodução</h4>
          <motion.div 
            className="preference-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={autoPlay}
                onChange={() => setAutoPlay(!autoPlay)}
              />
              <span className="slider"></span>
            </label>
            <div className="preference-info">
              <span><MdAutoAwesome /> Reprodução automática</span>
              <p>Reproduzir automaticamente a próxima música</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="preference-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
          >
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={dataSaver}
                onChange={() => setDataSaver(!dataSaver)}
              />
              <span className="slider"></span>
            </label>
            <div className="preference-info">
              <span><MdDataSaverOff /> Modo economia de dados</span>
              <p>Reduz a qualidade de streaming para usar menos dados</p>
            </div>
          </motion.div>
          
          <motion.div 
            className="preference-item"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2, ease: "easeOut" }}
          >
            <label className="toggle-switch">
              <input 
                type="checkbox" 
                checked={highQuality}
                onChange={() => setHighQuality(!highQuality)}
              />
              <span className="slider"></span>
            </label>
            <div className="preference-info">
              <span><BsMusicPlayer /> Alta qualidade de áudio</span>
              <p>Reproduzir músicas na melhor qualidade disponível</p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="preference-actions"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        >
          <motion.button 
            className="save-btn"
            whileHover={{ y: -2, boxShadow: "0 8px 20px rgba(138, 79, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaSave /> Salvar Alterações
          </motion.button>
          <motion.button 
            className="reset-btn" 
            onClick={handleResetSettings}
            whileHover={{ y: -2, backgroundColor: "rgba(0, 0, 0, 0.1)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FaUndo /> Redefinir
          </motion.button>
        </motion.div>
      </motion.div>
    ),
    
    about: (
      <motion.div 
        className="tab-content"
        variants={tabVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <div className="tab-header">
          <motion.div 
            className="tab-icon"
            whileHover={{ rotate: 15 }}
          >
            <FaInfoCircle />
          </motion.div>
          <div>
            <h3>Nosso universo musical</h3>
            <p>Um espaço especial para nossa história</p>
          </div>
        </div>
        
        <motion.div 
          className="about-card" 
          style={{ 
            background: `linear-gradient(135deg, rgba(138, 79, 255, 0.1) 0%, rgba(255, 79, 139, 0.1) 100%)` 
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className="about-heart"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            ❤️
          </motion.div>
          <h4>Nossa Jornada Musical</h4>
          <p>
            Este é o nosso espaço especial desde {new Date().getFullYear()}, onde cada música 
            conta uma parte da nossa história juntos. Um lugar para celebrar nossos momentos 
            especiais e criar novas memórias.
          </p>
          
          <div className="about-stats">
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="stat-number">∞</span>
              <span className="stat-label">Momentos</span>
            </motion.div>
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2, delay: 0.1 }}
            >
              <span className="stat-number">{Object.keys(themes).length}</span>
              <span className="stat-label">Temas</span>
            </motion.div>
            <motion.div 
              className="stat"
              whileHover={{ scale: 1.05, y: -5 }}
              transition={{ duration: 0.2, delay: 0.2 }}
            >
              <span className="stat-number">24/7</span>
              <span className="stat-label">Sempre Disponível</span>
            </motion.div>
          </div>
        </motion.div>
        
        <motion.div 
          className="app-info"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        >
          <h4><FaCog /> Informações do Aplicativo</h4>
          <div className="info-grid">
            <div className="info-item">
              <span>Versão</span>
              <span>2.1.0</span>
            </div>
            <div className="info-item">
              <span>Desenvolvido com</span>
              <span>React & <FaHeart style={{color: '#ff4f8b'}} /></span>
            </div>
            <div className="info-item">
              <span>Última atualização</span>
              <span>{new Date().toLocaleDateString('pt-BR')}</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    )
  };

  return (
    <div className="settings-page" style={{ color: theme.colors.text, backgroundColor: theme.colors.background }}>
      <motion.div 
        className="settings-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Configurações do Nosso Universo
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Personalize nossa experiência juntos
        </motion.p>
      </motion.div>

      <div className="settings-container">
        <motion.div 
          className="settings-sidebar" 
          style={{ backgroundColor: theme.colors.card }}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div 
            className={`sidebar-item ${activeTab === 'theme' ? 'active' : ''}`}
            onClick={() => setActiveTab('theme')}
            whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: activeTab === 'theme' ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)` : 'transparent',
              color: activeTab === 'theme' ? '#fff' : theme.colors.text
            }}
          >
            <IoMdColorFill />
            <span>Aparência</span>
          </motion.div>
          
          <motion.div 
            className={`sidebar-item ${activeTab === 'account' ? 'active' : ''}`}
            onClick={() => setActiveTab('account')}
            whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: activeTab === 'account' ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)` : 'transparent',
              color: activeTab === 'account' ? '#fff' : theme.colors.text
            }}
          >
            <RiUserSettingsLine />
            <span>Conta</span>
          </motion.div>
          
          <motion.div 
            className={`sidebar-item ${activeTab === 'preferences' ? 'active' : ''}`}
            onClick={() => setActiveTab('preferences')}
            whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: activeTab === 'preferences' ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)` : 'transparent',
              color: activeTab === 'preferences' ? '#fff' : theme.colors.text
            }}
          >
            <MdNotificationsActive />
            <span>Preferências</span>
          </motion.div>
          
          <motion.div 
            className={`sidebar-item ${activeTab === 'about' ? 'active' : ''}`}
            onClick={() => setActiveTab('about')}
            whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.1)" }}
            whileTap={{ scale: 0.95 }}
            style={{
              background: activeTab === 'about' ? `linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.accent} 100%)` : 'transparent',
              color: activeTab === 'about' ? '#fff' : theme.colors.text
            }}
          >
            <FaInfoCircle />
            <span>Sobre</span>
          </motion.div>
        </motion.div>

        <div className="settings-content" style={{ backgroundColor: theme.colors.card }}>
          <AnimatePresence mode="wait">
            {tabContent[activeTab]}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Settings;