import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Confetti from 'react-confetti';
import { FaHeart, FaTrophy, FaRedo, FaCheck, FaTimes, FaStar, FaAward } from 'react-icons/fa';
import { GiPartyPopper } from 'react-icons/gi';
import './QuizGame.css';

const QuizGame = () => {
  const questions = [
    {
      question: "Qual é a minha comida favorita?",
      options: ["Pizza", "Sushi", "Lasanha", "Strogonoff"],
      answer: 0,
      explanation: "Pizza é a minha paixão! Especialmente com muito queijo e pepperoni."
    },
    {
      question: "Qual é a minha cor favorita?",
      options: ["Preto", "Roxo", "Branco", "Azul"],
      answer: 0,
      explanation: "Preto é minha cor favorita - elegante e combina com tudo!"
    },
    {
      question: "Qual é o meu hobby favorito?",
      options: ["Ler", "Cozinhar", "Viajar", "Jogar videogame"],
      answer: 3,
      explanation: "Jogar videogame é uma das minhas maiores paixões! Adoro me perder em mundos virtuais."
    },
     {
      question: "Onde nos conhecemos?",
      options: ["Escola", "Trabalho", "Festa", "App de relacionamento"],
      answer: 4, // App de relacionamento
      explanation: "Foi no Tinder... até agora não sei como você me curtiu."
    },
    {
      question: "Qual é o meu filme preferido?",
      options: ["O Poderoso Chefão", "Carros 3", "Interestelar", "Harry Potter"],
      answer: 2, // Interestelar
      explanation: "Adoro a combinação de ficção científica e drama emocional!"
    }
    ,{
      question: "Qual é a minha série favorita?",
      options: ["Breaking Bad", "Game of Thrones", "Stranger Things", "Friends"],
      answer: 1, // Game of Thrones
      explanation: "Game of Thrones é uma das minhas séries favoritas pela sua trama complexa e personagens cativantes."
    },
    {
      question: "Qual é o meu animal favorito?",
      options: ["Cachorro", "Gato", "Pássaro", "Peixe"],
      answer: 0, // Cachorro
      explanation: "Cachorros são os melhores amigos do homem! Eu adoro a lealdade e a alegria que eles trazem."
    }
    ,{
      question: "Qual é o meu lugar favorito para viajar?",
      options: ["Praia", "Montanha", "Cidade grande", "Campo"],
      answer: 0, // Praia
      explanation: "A praia é o meu lugar favorito para relaxar e aproveitar o sol! Adoro a sensação da areia nos pés e o som das ondas."
    },  
    {
      question: "Qual é o meu tipo de música favorito?",
      options: ["Rock", "Pop", "MPB", "Sertanejo"],
      answer: 2, // MPB
      explanation: "Eu amo a MPB! A mistura de ritmos e a poesia das letras me encantam."
    },
    {
      question: "Qual é o meu esporte favorito?",   
      options: ["Futebol", "Basquete", "Vôlei", "Natação"],
      answer: 0, // Futebol
      explanation: "Futebol é a minha paixão! Adoro assistir e jogar sempre que posso."
    },
    {
      question: "Qual é o meu livro favorito?",
      options: ["Dom Casmurro", "1984", "O Pequeno Príncipe", "Harry Potter"],
      answer: 2, // O Pequeno Príncipe
      explanation: "O Pequeno Príncipe é um livro que me toca profundamente com suas lições sobre amor e amizade."
    }
    ,{
      question: "Qual é o meu doce favorito?",
      options: ["Chocolate", "Bolo de cenoura", "Pudim", "Sorvete"],
      answer: 0, // Chocolate
      explanation: "Chocolate é a minha fraqueza! Não consigo resistir a um bom pedaço de chocolate amargo."
    }
    ,{
      question: "Qual é o meu passatempo favorito?",
      options: ["Assistir filmes", "Ler livros", "Cozinhar", "Jogar videogame"],
      answer: 3, // Jogar videogame
      explanation: "Jogar videogame é uma das minhas maiores paixões! Adoro me perder em mundos virtuais."
    }
    ,{
      question: "Qual é o meu super-herói favorito?",
      options: ["Batman", "Superman", "Mulher Maravilha", "Homem-Aranha"],
      answer: 0, // Batman
      explanation: "Batman é o meu super-herói favorito por sua inteligência, habilidades de combate e a luta contra o crime em Gotham City."
    }
    ,{
      question: "Qual é o meu destino de viagem dos sonhos?",
      options: ["Japão", "França", "Estados Unidos", "Brasil"],
      answer: 0, // Japão
      explanation: "O Japão é o meu destino de viagem dos sonhos! Admiro a cultura, a comida e a tecnologia avançada do país."
    }
    ,{
      question: "Qual é o meu estilo de roupa favorito?",
      options: ["Casual", "Esportivo", "Formal", "Alternativo"],
      answer: 0, // Casual
      explanation: "Eu prefiro roupas casuais, confortáveis e práticas para o dia a dia."
    }
    ,{
      question: "Qual é o meu tipo de filme favorito?",
      options: ["Ação", "Comédia", "Drama", "Terror"],
      answer: 2, // Drama
      explanation: "Eu adoro filmes de drama! Eles me fazem refletir sobre a vida e as emoções humanas."
    }
    ,{
      question: "Qual é o meu tipo de comida favorita?",
      options: ["Italiana", "Japonesa", "Mexicana", "Brasileira"],
      answer: 1, // Japonesa
      explanation: "A comida japonesa é a minha favorita! Adoro a frescura dos ingredientes e a apresentação dos pratos."
    }
    ,{
      question: "Qual é o meu tipo de bebida favorita?",
      options: ["Cerveja", "Vinho", "Refrigerante", "Água"],
      answer: 1, // Vinho
      explanation: "Eu adoro vinho! Especialmente os tintos encorpados que combinam bem com uma boa refeição."
    }
    ,{
      question: "Qual é o meu tipo de arte favorito?",
      options: ["Pintura", "Escultura", "Fotografia", "Música"],
      answer: 0, // Pintura

      explanation: "A pintura é a minha forma de arte favorita! Admiro a criatividade e a expressão dos artistas."
    }
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  const [showConfetti, setShowConfetti] = useState(false);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleAnswer = (optionIndex) => {
    setSelectedOption(optionIndex);
    const isCorrect = optionIndex === questions[currentQuestion].answer;
    
    if (isCorrect) {
      setScore(score + 1);
      setStreak(streak + 1);
      if (streak + 1 > maxStreak) {
        setMaxStreak(streak + 1);
      }
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      setShowExplanation(true);
    }, 500);

    setTimeout(() => {
      setShowExplanation(false);
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedOption(null);
      } else {
        if (isCorrect) {
          setShowConfetti(true);
        }
        setShowResult(true);
      }
    }, 2500);
  };

  const restartGame = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowResult(false);
    setSelectedOption(null);
    setShowConfetti(false);
    setStreak(0);
  };

  const getResultMessage = () => {
    const percentage = (score / questions.length) * 100;
    
    if (percentage === 100) {
      return (
        <div className="perfect-score">
          <FaTrophy className="result-icon" />
          <span>Perfeito! Você me conhece melhor do que eu mesmo!</span>
          <GiPartyPopper className="result-icon" />
        </div>
      );
    } else if (percentage >= 80) {
      return (
        <div className="great-score">
          <FaAward className="result-icon" />
          <span>Excelente! Você realmente me conhece bem!</span>
        </div>
      );
    } else if (percentage >= 60) {
      return 'Bom trabalho! Você me conhece bastante!';
    } else if (percentage >= 40) {
      return 'Você me conhece, mas pode melhorar!';
    } else {
      return 'Precisamos nos conhecer melhor!';
    }
  };

  const getStreakMessage = () => {
    if (maxStreak >= 5) {
      return (
        <div className="streak-message">
          <FaStar className="streak-icon" />
          <span>Sequência máxima: {maxStreak} acertos seguidos!</span>
          <FaStar className="streak-icon" />
        </div>
      );
    }
    return null;
  };

  return (
    <div className="quiz-game-container">
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          recycle={false}
          numberOfPieces={800}
          colors={['#8a4fff', '#ff4f8b', '#9d6aff', '#ff6b9d']}
          onConfettiComplete={() => setShowConfetti(false)}
        />
      )}
      
      <div className="quiz-game">
        {!showResult ? (
          <>
            <header className="quiz-header">
              <motion.div 
                className="header-content"
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1 
                  className="quiz-title"
                  whileHover={{ scale: 1.02 }}
                >
                  Quiz do Nosso Amor
                  <FaHeart className="heart-icon" />
                </motion.h1>
                
                <div className="progress-container">
                  <div className="progress-info">
                    <span>Progresso: {currentQuestion + 1}/{questions.length}</span>
                    {streak > 1 && (
                      <span className="streak-counter">
                        <FaStar /> Sequência: {streak}
                      </span>
                    )}
                  </div>
                  <motion.div 
                    className="progress-bar"
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${((currentQuestion + 1) / questions.length) * 100}%`,
                      transition: { duration: 0.5, ease: "easeOut" }
                    }}
                  ></motion.div>
                </div>
              </motion.div>
            </header>
            
            <AnimatePresence mode='wait'>
              <motion.div 
                className="question-card"
                key={currentQuestion}
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 50, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              >
                <motion.h2 
                  className="question-text"
                  whileHover={{ scale: 1.01 }}
                >
                  {questions[currentQuestion].question}
                </motion.h2>
                
                <div className="options-grid">
                  {questions[currentQuestion].options.map((option, index) => (
                    <motion.button
                      key={index}
                      className={`option-btn ${
                        selectedOption !== null && 
                        index === questions[currentQuestion].answer ? 'correct' : ''
                      } ${
                        selectedOption === index && 
                        index !== questions[currentQuestion].answer ? 'wrong' : ''
                      }`}
                      onClick={() => handleAnswer(index)}
                      disabled={selectedOption !== null}
                      whileHover={{ 
                        scale: selectedOption === null ? 1.03 : 1,
                        boxShadow: selectedOption === null ? '0 4px 8px rgba(0,0,0,0.1)' : 'none'
                      }}
                      whileTap={{ scale: selectedOption === null ? 0.98 : 1 }}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { delay: index * 0.1 }
                      }}
                    >
                      <span className="option-letter">
                        {String.fromCharCode(65 + index)}
                      </span>
                      <span className="option-text">{option}</span>
                    </motion.button>
                  ))}
                </div>

                <AnimatePresence>
                  {showExplanation && (
                    <motion.div
                      className="explanation-box"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: 1, 
                        y: 0,
                        transition: { type: 'spring', stiffness: 200 }
                      }}
                      exit={{ opacity: 0 }}
                    >
                      <p>{questions[currentQuestion].explanation}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </>
        ) : (
          <motion.div 
            className="result-container"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              transition: { type: 'spring', stiffness: 300, damping: 20 }
            }}
          >
            <div className="result-content">
              <motion.h2 
                className="result-title"
                whileHover={{ scale: 1.02 }}
              >
                Resultado Final!
              </motion.h2>
              
              <div className="score-display">
                <div className="score-circle">
                  <svg viewBox="0 0 36 36" className="circular-chart">
                    <path
                      className="circle-bg"
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <path
                      className="circle-fill"
                      strokeDasharray={`${(score / questions.length) * 100}, 100`}
                      d="M18 2.0845
                        a 15.9155 15.9155 0 0 1 0 31.831
                        a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    <text x="18" y="20.35" className="percentage">
                      {Math.round((score / questions.length) * 100)}%
                    </text>
                  </svg>
                </div>
                
                <div className="score-details">
                  <p className="score-text">
                    Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> perguntas
                  </p>
                  
                  {getStreakMessage()}
                </div>
              </div>
              
              <motion.div 
                className="result-message"
                whileHover={{ scale: 1.01 }}
              >
                {getResultMessage()}
              </motion.div>
              
              <div className="result-details">
                {questions.map((q, index) => (
                  <motion.div 
                    key={index} 
                    className="question-result"
                    whileHover={{ backgroundColor: 'rgba(0,0,0,0.03)' }}
                  >
                    <span className={`result-icon ${
                      score > index ? 'correct' : 'wrong'
                    }`}>
                      {score > index ? <FaCheck /> : <FaTimes />}
                    </span>
                    <span className="question-summary">{q.question}</span>
                  </motion.div>
                ))}
              </div>
              
              <motion.button 
                onClick={restartGame} 
                className="restart-btn"
                whileHover={{ 
                  scale: 1.05, 
                  boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                }}
                whileTap={{ scale: 0.95 }}
              >
                <FaRedo className="restart-icon" /> Jogar Novamente
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default QuizGame;