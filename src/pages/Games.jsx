import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBrain, FaQuestionCircle, FaHandsHelping, FaHeart, FaGamepad } from 'react-icons/fa';
import { GiBrain, GiPartyPopper } from 'react-icons/gi';
import MemoryGame from '../games/MemoryGame';
import QuizGame from '../games/QuizGame';
import NeverEver from '../games/NeverEver';
import './Games.css';

const Games = () => {
  const [activeGame, setActiveGame] = useState('memory');
  const [isHovering, setIsHovering] = useState(null);

  const games = [
    { 
      id: 'memory', 
      name: 'Jogo da Memória', 
      icon: <GiBrain size={24} />,
      hoverIcon: <GiBrain size={24} className="pulse" />,
      color: 'var(--purple-500)'
    },
    { 
      id: 'quiz', 
      name: 'Quiz do Casal', 
      icon: <FaQuestionCircle size={22} />,
      hoverIcon: <FaQuestionCircle size={22} className="spin" />,
      color: 'var(--pink-500)'
    },
    { 
      id: 'never', 
      name: 'Nunca Eu Nunca', 
      icon: <FaHandsHelping size={22} />,
      hoverIcon: <FaHandsHelping size={22} className="wobble" />,
      color: 'var(--purple-400)'
    }
  ];

  const renderGame = () => {
    switch (activeGame) {
      case 'memory':
        return <MemoryGame />;
      case 'quiz':
        return <QuizGame />;
      case 'never':
        return <NeverEver />;
      default:
        return <MemoryGame />;
    }
  };

  return (
    <div className="games-page">
      <div className="games-background"></div>
      
      <div className="games-header">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="title-container"
        >
          <FaGamepad className="title-icon" size={32} />
          <h1 className="games-title">Nossos Jogos Especiais</h1>
          <GiPartyPopper className="title-icon" size={32} />
        </motion.div>
        
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="games-subtitle"
        >
          Escolha um jogo para se divertir juntos!
        </motion.p>
      </div>

      <div className="games-navigation">
        {games.map((game) => (
          <motion.button
            key={game.id}
            className={`game-tab ${activeGame === game.id ? 'active' : ''}`}
            onClick={() => setActiveGame(game.id)}
            onMouseEnter={() => setIsHovering(game.id)}
            onMouseLeave={() => setIsHovering(null)}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '0 8px 16px rgba(0,0,0,0.15)'
            }}
            whileTap={{ scale: 0.98 }}
            style={{ '--game-color': game.color }}
          >
            <span className="game-icon">
              {isHovering === game.id ? game.hoverIcon : game.icon}
            </span>
            <span className="game-name">{game.name}</span>
            {activeGame === game.id && (
              <motion.div 
                className="active-indicator"
                layoutId="activeIndicator"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        ))}
      </div>

      <div className="game-container">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeGame}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ 
              duration: 0.4,
              ease: [0.22, 1, 0.36, 1]
            }}
          >
            {renderGame()}
          </motion.div>
        </AnimatePresence>
      </div>

      <footer className="games-footer">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          Criado com <FaHeart className="heart-beat" /> para diversão do casal
        </motion.p>
      </footer>
    </div>
  );
};

export default Games;