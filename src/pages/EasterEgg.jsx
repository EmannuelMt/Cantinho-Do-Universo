import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaSurprise, FaGift } from 'react-icons/fa';
import './EasterEgg.css';

const EasterEgg = () => {
  const [showSurprise, setShowSurprise] = useState(false);
  const messages = [
    "Você é a melhor coisa que me aconteceu!",
    "Cada dia com você é especial ❤️",
    "Eu te amo mais que tudo nesse universo",
    "Você merece o mundo e mais um pouco"
  ];
  const [randomMessage] = useState(
    messages[Math.floor(Math.random() * messages.length)]
  );

  return (
    <div className="easter-egg-page">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="secret-container"
      >
        <FaSurprise className="surprise-icon" />
        <h1>Surpresa Secreta!</h1>
        <p>Você descobriu nosso cantinho especial</p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="surprise-btn"
          onClick={() => setShowSurprise(!showSurprise)}
        >
          <FaGift /> Clique para uma surpresa
        </motion.button>

        {showSurprise && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="surprise-message"
          >
            <FaHeart className="heart-icon" />
            <p>{randomMessage}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default EasterEgg;