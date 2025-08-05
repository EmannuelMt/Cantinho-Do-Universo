import { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { motion } from 'framer-motion';
import './AuthModal.css';

const AuthModal = () => {
  const { login, setShowAuthModal, authError } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ name: '', password: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    login(credentials.name, credentials.password);
  };

  return (
    <motion.div 
      className="auth-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="auth-modal"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
      >
        <button 
          className="close-btn"
          onClick={() => setShowAuthModal(false)}
        >
          &times;
        </button>

        <h2>Acesse Nosso Universo</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Seu Nome</label>
            <input
              type="text"
              value={credentials.name}
              onChange={(e) => setCredentials({...credentials, name: e.target.value})}
              required
            />
          </div>

          <div className="input-group">
            <label>Senha Especial</label>
            <input
              type="password"
              value={credentials.password}
              onChange={(e) => setCredentials({...credentials, password: e.target.value})}
              required
            />
          </div>

          {authError && <p className="error-message">{authError}</p>}

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Entrar
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default AuthModal;