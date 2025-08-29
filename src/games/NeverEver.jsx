import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRedo, FaGlassCheers, FaLaughSquint, FaFlushed } from 'react-icons/fa';
import './NeverEver.css';

const NeverEver = () => {
  const questions = [
    "Nunca eu nunca menti para você",
    "Nunca eu nunca esqueci nosso aniversário",
    "Nunca eu nunca comi seu doce favorito escondido",
    "Nunca eu nunca fingi que gostei de um presente seu",
    "Nunca eu nunca fiquei com ciúmes de alguém",
    "Nunca eu nunca dei uma desculpa esfarrapada",
    "Nunca eu nunca ri de uma situação constrangedora sua",
    "Nunca eu nunca falei de você para meus amigos",
    "Nunca eu nunca imaginei nosso futuro juntos",
    "Nunca eu nunca te dei um apelido carinhoso na minha cabeça"
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showOptions, setShowOptions] = useState(false);
  const [score, setScore] = useState({ player1: 0, player2: 0 });
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  const startGame = () => {
    setGameStarted(true);
    setCurrentQuestion(0);
    setScore({ player1: 0, player2: 0 });
    setGameFinished(false);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore({ player1: 0, player2: 0 });
    setGameFinished(false);
    setShowOptions(false);
  };

  const handleAnswer = (player) => {
    if (player === 'player1') {
      setScore(prev => ({ ...prev, player1: prev.player1 + 1 }));
    } else {
      setScore(prev => ({ ...prev, player2: prev.player2 + 1 }));
    }

    setShowOptions(false);
    
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prev => prev + 1);
      } else {
        setGameFinished(true);
      }
    }, 1000);
  };

  const revealOptions = () => {
    setShowOptions(true);
  };

  const getResultMessage = () => {
    if (score.player1 === score.player2) {
      return (
        <div className="result-message tie">
          <FaGlassCheers /> Empate! Vocês são parecidos! <FaGlassCheers />
        </div>
      );
    } else if (score.player1 > score.player2) {
      return (
        <div className="result-message winner">
          <FaLaughSquint /> Jogador 1 venceu! Parece que ele(a) é mais atrevido(a)! <FaLaughSquint />
        </div>
      );
    } else {
      return (
        <div className="result-message winner">
          <FaLaughSquint /> Jogador 2 venceu! Parece que ele(a) é mais atrevido(a)! <FaLaughSquint />
        </div>
      );
    }
  };

  return (
    <div className="never-ever-container">
      {!gameStarted ? (
        <motion.div 
          className="start-screen"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="game-title">Nunca Eu Nunca</h1>
          <p className="game-description">
            Descubra quem conhece melhor o outro nesse jogo divertido para casais!
          </p>
          <motion.button
            className="start-button"
            onClick={startGame}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Começar Jogo
          </motion.button>
        </motion.div>
      ) : !gameFinished ? (
        <div className="game-screen">
          <div className="score-board">
            <div className={`player-score ${score.player1 > score.player2 ? 'leading' : ''}`}>
              <span>Jogador 1</span>
              <span>{score.player1}</span>
            </div>
            <div className="vs-circle">VS</div>
            <div className={`player-score ${score.player2 > score.player1 ? 'leading' : ''}`}>
              <span>Jogador 2</span>
              <span>{score.player2}</span>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              className="question-card"
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 50, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            >
              <h2 className="question-text">{questions[currentQuestion]}</h2>
              
              {!showOptions ? (
                <motion.button
                  className="reveal-button"
                  onClick={revealOptions}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  Revelar Opções
                </motion.button>
              ) : (
                <div className="options-container">
                  <motion.button
                    className="option-button player1"
                    onClick={() => handleAnswer('player1')}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    Eu Já!
                  </motion.button>
                  <motion.button
                    className="option-button player2"
                    onClick={() => handleAnswer('player2')}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    Eu Já!
                  </motion.button>
                  <motion.button
                    className="option-button neither"
                    onClick={() => handleAnswer('neither')}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    Nenhum <FaFlushed />
                  </motion.button>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="progress-indicator">
            Pergunta {currentQuestion + 1} de {questions.length}
          </div>
        </div>
      ) : (
        <motion.div 
          className="result-screen"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="result-title">Resultado Final!</h2>
          
          <div className="final-scores">
            <div className="final-score player1">
              <span>Jogador 1</span>
              <span className="score-number">{score.player1}</span>
            </div>
            <div className="final-score player2">
              <span>Jogador 2</span>
              <span className="score-number">{score.player2}</span>
            </div>
          </div>

          {getResultMessage()}

          <div className="action-buttons">
            <motion.button
              className="restart-button"
              onClick={restartGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaRedo /> Jogar Novamente
            </motion.button>
            <motion.button
              className="new-game-button"
              onClick={startGame}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Novo Jogo
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default NeverEver;