import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRedo, FaHeart, FaTrophy, FaStar } from 'react-icons/fa';
import './MemoryGame.css';

const MemoryGame = () => {
  const couplePhotos = [
    '/fotos/photo1.jpg',
    '/fotos/photo2.jpg',
    '/fotos/photo3.jpg',
    '/fotos/photo4.jpg',
    '/fotos/photo5.jpg',
    '/fotos/photo6.jpg'
  ];

  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [solved, setSolved] = useState([]);
  const [disabled, setDisabled] = useState(false);
  const [moves, setMoves] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  // Inicializa o jogo
  const initializeGame = () => {
    if (!couplePhotos || couplePhotos.length < 3) {
      console.error('Adicione pelo menos 3 fotos diferentes em couplePhotos');
      return;
    }

    const selectedPhotos = [...couplePhotos]
      .sort(() => 0.5 - Math.random())
      .slice(0, 4); // Aumentado para 4 pares (8 cartas)

    const gameCards = [...selectedPhotos, ...selectedPhotos]
      .sort(() => 0.5 - Math.random())
      .map((photo, index) => ({
        id: index,
        photo,
        flipped: false,
        matched: false
      }));

    setCards(gameCards);
    setFlipped([]);
    setSolved([]);
    setMoves(0);
    setGameWon(false);
    setShowConfetti(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  useEffect(() => {
    if (solved.length > 0 && solved.length === cards.length) {
      setGameWon(true);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
    }
  }, [solved, cards.length]);

  const handleCardClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);
    setMoves(moves + 1);

    if (newFlipped.length === 2) {
      setDisabled(true);
      checkForMatch(newFlipped);
    }
  };

  const checkForMatch = (flippedCards) => {
    const [first, second] = flippedCards;
    const firstCard = cards.find(card => card.id === first);
    const secondCard = cards.find(card => card.id === second);

    if (firstCard.photo === secondCard.photo) {
      setSolved([...solved, first, second]);
      setTimeout(resetCards, 500);
    } else {
      setTimeout(resetCards, 1000);
    }
  };

  const resetCards = () => {
    setFlipped([]);
    setDisabled(false);
  };

  const resetGame = () => {
    initializeGame();
  };

  const getStarRating = () => {
    if (moves < 20) return 3;
    if (moves < 30) return 2;
    return 1;
  };

  return (
    <div className="memory-game-container">
      {showConfetti && (
        <div className="confetti-overlay">
          {[...Array(100)].map((_, i) => (
            <motion.div
              key={i}
              className="confetti"
              initial={{ y: -100, x: Math.random() * window.innerWidth, rotate: 0 }}
              animate={{
                y: window.innerHeight,
                rotate: 360,
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: 0
              }}
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 100%, 50%)`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`
              }}
            />
          ))}
        </div>
      )}

      <div className="memory-game">
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Jogo da Memória do Casal
          <FaHeart className="heart-icon" />
        </motion.h2>

        <div className="game-info">
          <div className="moves-counter">Movimentos: {moves}</div>
          <div className="stars">
            {[...Array(3)].map((_, i) => (
              <FaStar 
                key={i} 
                className={i < getStarRating() ? 'star-filled' : 'star-empty'} 
              />
            ))}
          </div>
        </div>

        <div className="cards-grid">
          {cards.map(card => (
            <motion.div
              key={card.id}
              className={`memory-card ${
                flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''
              }`}
              onClick={() => handleCardClick(card.id)}
              whileHover={{ scale: solved.includes(card.id) ? 1 : 1.05 }}
              whileTap={{ scale: solved.includes(card.id) ? 1 : 0.95 }}
              layout
              transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            >
              <motion.div 
                className="card-front"
                initial={false}
                animate={{ rotateY: flipped.includes(card.id) || solved.includes(card.id) ? 180 : 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="card-content">
                  <span>?</span>
                </div>
              </motion.div>
              <motion.div 
                className="card-back"
                initial={false}
                animate={{ rotateY: flipped.includes(card.id) || solved.includes(card.id) ? 0 : 180 }}
                transition={{ duration: 0.6 }}
              >
                <motion.img 
                  src={card.photo} 
                  alt="Foto do casal" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.button 
          onClick={resetGame} 
          className="reset-button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaRedo /> Reiniciar Jogo
        </motion.button>

        <AnimatePresence>
          {gameWon && (
            <motion.div 
              className="win-message"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <FaTrophy className="trophy-icon" />
              <h3>Parabéns!</h3>
              <p>Você completou o jogo em {moves} movimentos!</p>
              <div className="final-stars">
                {[...Array(getStarRating())].map((_, i) => (
                  <FaStar key={i} className="star-gold" />
                ))}
              </div>
              <p>Memória incrível!</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default MemoryGame;