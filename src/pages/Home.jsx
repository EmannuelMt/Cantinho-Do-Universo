import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  RiHomeHeartFill, 
  RiGalleryFill, 
  RiMailStarFill, 
  RiGamepadFill,
  RiMusic2Fill,
  RiArrowRightSLine,
  RiPlayFill,
  RiHeartFill,
  RiSparkling2Fill
} from 'react-icons/ri';
import { useEffect, useRef } from 'react';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });
  
  const yBg = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityBg = useTransform(scrollYProgress, [0, 0.5], ["100%", "0%"]);

  // Efeito de partículas
  useEffect(() => {
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.className = 'particle';
      
      // Posição aleatória
      particle.style.left = `${Math.random() * 100}vw`;
      particle.style.top = `${Math.random() * 100}vh`;
      
      // Tamanho aleatório
      const size = Math.random() * 0.5 + 0.2;
      particle.style.width = `${size}rem`;
      particle.style.height = `${size}rem`;
      
      // Cor aleatória (roxo/rosa)
      const colors = ['#8a4fff', '#ff4f8b', '#b18bff', '#ff88b0'];
      particle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      // Opacidade e animação
      particle.style.opacity = Math.random() * 0.5 + 0.1;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      
      document.querySelector('.hero-section').appendChild(particle);
      
      // Remover após animação
      setTimeout(() => {
        particle.remove();
      }, 15000);
    };
    
    // Criar partículas periodicamente
    const interval = setInterval(createParticle, 300);
    
    return () => clearInterval(interval);
  }, []);

  // Dados de exemplo
  const recentMoments = [
    { id: 1, image: "/assets/images/moment1.jpg", date: "15/05/2023", title: "Dia dos Namorados" },
    { id: 2, image: "/assets/images/moment2.jpg", date: "22/06/2023", title: "Férias na Praia" },
    { id: 3, image: "/assets/images/moment3.jpg", date: "30/08/2023", title: "Aniversário" }
  ];

  const games = [
    { id: 1, title: "Quiz do Amor", description: "Teste quanto você me conhece" },
    { id: 2, title: "Jogo da Memória", description: "Nossos melhores momentos" },
    { id: 3, title: "Forca Romântica", description: "Adivinhe as palavras" }
  ];

  const letters = [
    { id: 1, title: "Primeira Carta", date: "14/02/2022", excerpt: "Desde o dia que te conheci..." },
    { id: 2, title: "No Seu Aniversário", date: "05/07/2022", excerpt: "Hoje é o seu dia especial..." },
    { id: 3, title: "Quando Você Viajou", date: "12/10/2022", excerpt: "Estou com saudades desde..." }
  ];

  const songs = [
    { id: 1, title: "Nossa Música", artist: "Artista Favorito" },
    { id: 2, title: "Do Jeito Que Eu Gosto", artist: "Banda Preferida" },
    { id: 3, title: "Sempre Juntos", artist: "Cantor Especial" }
  ];

  // Variantes de animação
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.5
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 120,
        damping: 15
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  return (
    <div className="home-page" ref={containerRef}>
      {/* Seção Hero */}
      <motion.section
        className="hero-section"
        style={{ y: yBg, opacity: opacityBg }}
      >
        <div className="particles-container"></div>
        
        <motion.div 
          className="hero-content"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <RiHomeHeartFill className="hero-icon" />
            <RiSparkling2Fill className="sparkle-icon sparkle-1" />
            <RiSparkling2Fill className="sparkle-icon sparkle-2" />
          </motion.div>
          
          <motion.h1 variants={itemVariants}>
            {user ? `Bem-vindo(a) de volta, ${user.name}!` : 'Nosso Universo Particular'}
          </motion.h1>
          
          <motion.p variants={itemVariants}>
            Um lugar para guardar nossos momentos mais especiais
          </motion.p>

          <motion.div
            className="couple-image-container"
            variants={itemVariants}
            whileHover={{ scale: 1.03 }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <img
              src="/assets/images/couple.jpg"
              alt="Nós dois"
              className="couple-image"
            />
            <div className="image-overlay" />
            <div className="image-frame"></div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <motion.button
              className="cta-button"
              onClick={() => navigate('/momentos')}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(138, 79, 255, 0.4)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              Explorar Nosso Universo
              <RiArrowRightSLine className="button-icon" />
            </motion.button>
          </motion.div>
        </motion.div>
      </motion.section>

      {/* Seção Momentos */}
      <motion.section 
        className="section moments-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <div className="section-header">
          <motion.div 
            className="icon-container"
            whileHover={{ rotate: 15 }}
          >
            <RiGalleryFill className="section-icon" />
          </motion.div>
          <h2>Nossos Momentos</h2>
          <p>Reviva nossas memórias mais especiais</p>
        </div>

        <motion.div 
          className="moments-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {recentMoments.slice(0, 3).map((moment, index) => (
            <motion.div 
              key={moment.id}
              className="moment-card"
              variants={itemVariants}
              custom={index}
              whileHover={{ y: -15, scale: 1.03 }}
              onClick={() => navigate('/momentos')}
            >
              <div className="moment-image-container">
                <img src={moment.image} alt={moment.title} />
                <div className="moment-overlay">
                  <h3>{moment.title}</h3>
                  <span>{moment.date}</span>
                  <RiHeartFill className="moment-icon" />
                </div>
              </div>
              <div className="moment-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="section-button"
          onClick={() => navigate('/momentos')}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 5px 15px rgba(138, 79, 255, 0.3)"
          }}
          whileTap={{ scale: 0.97 }}
        >
          Ver Todos os Momentos
          <RiArrowRightSLine className="button-icon" />
        </motion.button>
      </motion.section>

      {/* Seção Jogos */}
      <motion.section 
        className="section games-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <div className="section-header">
          <motion.div 
            className="icon-container"
            whileHover={{ rotate: -15 }}
          >
            <RiGamepadFill className="section-icon" />
          </motion.div>
          <h2>Nossos Jogos</h2>
          <p>Diversão e interação só nosso</p>
        </div>

        <motion.div 
          className="games-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {games.map((game, index) => (
            <motion.div
              key={game.id}
              className="game-card"
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 20px rgba(138, 79, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/jogos')}
            >
              <div className="game-icon-container">
                <RiGamepadFill className="game-icon" />
                <div className="game-icon-glow"></div>
              </div>
              <h3>{game.title}</h3>
              <p>{game.description}</p>
              <motion.button 
                className="play-button"
                whileHover={{ scale: 1.05 }}
              >
                Jogar <RiPlayFill />
              </motion.button>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Seção Cartas */}
      <motion.section 
        className="section letters-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <div className="section-header">
          <motion.div 
            className="icon-container"
            whileHover={{ scale: 1.1 }}
          >
            <RiMailStarFill className="section-icon" />
          </motion.div>
          <h2>Nossas Cartas</h2>
          <p>Mensagens cheias de amor</p>
        </div>

        <motion.div 
          className="letters-list"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {letters.slice(0, 3).map((letter, index) => (
            <motion.div
              key={letter.id}
              className="letter-card"
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                x: 10,
                boxShadow: "0 5px 15px rgba(138, 79, 255, 0.1)"
              }}
              onClick={() => navigate('/cartas')}
            >
              <div className="letter-icon-container">
                <RiMailStarFill className="letter-icon" />
                <div className="letter-icon-glow"></div>
              </div>
              <div className="letter-content">
                <h3>{letter.title}</h3>
                <span className="letter-date">{letter.date}</span>
                <p className="letter-excerpt">"{letter.excerpt}"</p>
              </div>
              <RiArrowRightSLine className="arrow-icon" />
              <div className="letter-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="section-button"
          onClick={() => navigate('/cartas')}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 5px 15px rgba(138, 79, 255, 0.3)"
          }}
          whileTap={{ scale: 0.97 }}
        >
          Ver Todas as Cartas
          <RiArrowRightSLine className="button-icon" />
        </motion.button>
      </motion.section>

      {/* Seção Músicas */}
      <motion.section 
        className="section music-section"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeInVariants}
      >
        <div className="section-header">
          <motion.div 
            className="icon-container"
            whileHover={{ scale: 1.1, rotate: 10 }}
          >
            <RiMusic2Fill className="section-icon" />
          </motion.div>
          <h2>Nossa Trilha Sonora</h2>
          <p>As músicas da nossa história</p>
        </div>

        <motion.div 
          className="music-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={containerVariants}
        >
          {songs.map((song, index) => (
            <motion.div
              key={song.id}
              className="music-card"
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 20px rgba(138, 79, 255, 0.2)"
              }}
              onClick={() => navigate('/musicas')}
            >
              <div className="music-icon-container">
                <RiMusic2Fill className="music-icon" />
                <div className="music-icon-glow"></div>
              </div>
              <div className="music-info">
                <h3>{song.title}</h3>
                <p>{song.artist}</p>
              </div>
              <div className="play-icon-container">
                <RiPlayFill className="play-icon" />
              </div>
              <div className="music-glow"></div>
            </motion.div>
          ))}
        </motion.div>

        <motion.button
          className="section-button"
          onClick={() => navigate('/musicas')}
          whileHover={{ 
            scale: 1.03,
            boxShadow: "0 5px 15px rgba(138, 79, 255, 0.3)"
          }}
          whileTap={{ scale: 0.97 }}
        >
          Ver Todas as Músicas
          <RiArrowRightSLine className="button-icon" />
        </motion.button>
      </motion.section>
    </div>
  );
};

export default Home;