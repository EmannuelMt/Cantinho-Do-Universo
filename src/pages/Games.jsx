import { useState, useEffect, useRef } from 'react'
import { 
  FaChess, FaDice, FaPuzzlePiece, FaBrain, FaHeart, 
  FaArrowLeft, FaCrown, FaUsers, FaStar, FaLock,
  FaShare, FaRedo, FaTrophy, FaClock, FaUserFriends,
  FaChevronRight, FaRegGem, FaTimes, FaCheck,
  FaVolumeUp, FaVolumeMute, FaCog, FaExpand
} from 'react-icons/fa'
import { 
  IoGameController, IoSparkles, IoDiamondOutline,
  IoClose, IoRadioButtonOn, IoSpeedometer,
  IoMdAdd, IoMdRemove
} from 'react-icons/io5'
import { 
  GiCardJackClubs, GiCrossedSwords, GiShipWheel,
  GiPokerHand, GiCardPickup, GiQueenCrown,
  GiChessKing, GiChessQueen, GiChessRook,
  GiChessBishop, GiChessKnight, GiChessPawn
} from 'react-icons/gi'
import { BsGrid3X3, BsLightningCharge, BsShuffle } from 'react-icons/bs'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Importar componentes de jogos
import QuizGame from './games/QuizGame'
import MemoryGame from './games/MemoryGame'
import TicTacToeGame from './games/TicTacToeGame'
import ChessGame from './games/ChessGame'
import BattleshipGame from './games/BattleshipGame'
import PokerGame from './games/PokerGame'
import DiceGame from './games/DiceGame'
import CrosswordGame from './games/CrosswordGame'

import GameCard from './GameCard'
import GameCategory from './GameCategory'
import './Games.css'

// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger)

const Games = () => {
  const [activeGame, setActiveGame] = useState(null)
  const [activeCategory, setActiveCategory] = useState('all')
  const [onlinePlayers, setOnlinePlayers] = useState(128)
  const [isLoading, setIsLoading] = useState(false)
  const sectionRef = useRef(null)
  const cardsRef = useRef([])
  const categoryRef = useRef(null)

  const gameCategories = [
    { id: 'all', name: 'Todos os Jogos', icon: <IoGameController />, color: '#8E44AD' },
    { id: 'couple', name: 'Para Casais', icon: <FaHeart />, color: '#C74D8F' },
    { id: 'puzzle', name: 'Quebra-Cabeças', icon: <FaPuzzlePiece />, color: '#3498DB' },
    { id: 'online', name: 'Online', icon: <FaUsers />, color: '#2ECC71' },
    { id: 'classic', name: 'Clássicos', icon: <FaCrown />, color: '#F39C12' }
  ]

  const games = [
    { 
      id: 1, 
      name: "Quiz do Amor", 
      description: "Teste o quanto vocês se conhecem com perguntas personalizadas sobre seu relacionamento",
      category: 'couple',
      icon: <FaBrain />,
      players: "2 jogadores",
      difficulty: "Fácil",
      time: "5-10 min",
      featured: true,
      popularity: 98
    },
    { 
      id: 2, 
      name: "Memória do Casal", 
      description: "Encontre os pares perfeitos com fotos especiais dos seus momentos juntos",
      category: 'couple',
      icon: <FaPuzzlePiece />,
      players: "1-2 jogadores",
      difficulty: "Médio",
      time: "10-15 min",
      featured: true,
      popularity: 92
    },
    { 
      id: 3, 
      name: "Jogo da Velha Premium", 
      description: "O clássico jogo da velha com design elegante e efeitos visuais surpreendentes",
      category: 'classic',
      icon: <BsGrid3X3 />,
      players: "2 jogadores",
      difficulty: "Fácil",
      time: "2-5 min",
      featured: false,
      popularity: 85
    },
    { 
      id: 4, 
      name: "Xadrez Romântico", 
      description: "Xadrez tradicional com peças temáticas de amor e cenários encantadores",
      category: 'classic',
      icon: <FaChess />,
      players: "2 jogadores",
      difficulty: "Difícil",
      time: "15-30 min",
      featured: true,
      popularity: 78
    },
    { 
      id: 5, 
      name: "Batalha Naval", 
      description: "Encontre a frota do seu parceiro no oceano do amor com estratégia e romance",
      category: 'online',
      icon: <GiShipWheel />,
      players: "2 jogadores online",
      difficulty: "Médio",
      time: "10-20 min",
      featured: false,
      popularity: 88
    },
    { 
      id: 6, 
      name: "Poker do Coração", 
      description: "Poker premium com cartas personalizadas e apostas românticas",
      category: 'online',
      icon: <GiPokerHand />,
      players: "2-4 jogadores",
      difficulty: "Difícil",
      time: "20-40 min",
      featured: true,
      popularity: 95
    },
    { 
      id: 7, 
      name: "Dados da Sorte", 
      description: "Jogo de dados com desafios românticos e recompensas especiais",
      category: 'puzzle',
      icon: <FaDice />,
      players: "2 jogadores",
      difficulty: "Fácil",
      time: "5-15 min",
      featured: false,
      popularity: 82
    },
    { 
      id: 8, 
      name: "Palavras Cruzadas", 
      description: "Complete palavras com pistas do seu relacionamento e descubra mensagens secretas",
      category: 'puzzle',
      icon: <FaPuzzlePiece />,
      players: "1-2 jogadores",
      difficulty: "Médio",
      time: "15-25 min",
      featured: false,
      popularity: 79
    }
  ]

  const filteredGames = activeCategory === 'all' 
    ? games 
    : games.filter(game => game.category === activeCategory)

  useEffect(() => {
    // Animações de entrada
    const anim = gsap.fromTo(cardsRef.current, 
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )

    // Animações das categorias
    gsap.fromTo(".category-btn", 
      { scale: 0.9, opacity: 0 },
      {
        scale: 1,
        opacity: 1,
        stagger: 0.1,
        duration: 0.5,
        scrollTrigger: {
          trigger: categoryRef.current,
          start: "top 90%",
          toggleActions: "play none none reverse"
        }
      }
    )

    return () => {
      anim.kill()
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [activeCategory])

  const startGame = async (gameId) => {
    setIsLoading(true)
    await new Promise(resolve => setTimeout(resolve, 800))
    setActiveGame(gameId)
    setIsLoading(false)
  }

  const renderGame = () => {
    if (!activeGame) return null

    const gameComponents = {
      1: <QuizGame onBack={() => setActiveGame(null)} />,
      2: <MemoryGame onBack={() => setActiveGame(null)} />,
      3: <TicTacToeGame onBack={() => setActiveGame(null)} />,
      4: <ChessGame onBack={() => setActiveGame(null)} />,
      5: <BattleshipGame onBack={() => setActiveGame(null)} />,
      6: <PokerGame onBack={() => setActiveGame(null)} />,
      7: <DiceGame onBack={() => setActiveGame(null)} />,
      8: <CrosswordGame onBack={() => setActiveGame(null)} />
    }

    return gameComponents[activeGame] || null
  }

  if (activeGame) {
    return renderGame()
  }

  return (
    <div className="games" ref={sectionRef}>
      <div className="games-container">
        <div className="games-header">
          <h1>Jogos para Casais</h1>
          <p>Descubra jogos divertidos para fortalecer seu relacionamento</p>
          
          <div className="online-counter">
            <FaUserFriends />
            <span>{onlinePlayers} jogadores online</span>
          </div>
        </div>

        <div className="categories-section" ref={categoryRef}>
          <h2>Categorias</h2>
          <div className="categories-grid">
            {gameCategories.map(category => (
              <GameCategory
                key={category.id}
                category={category}
                isActive={activeCategory === category.id}
                onClick={() => setActiveCategory(category.id)}
              />
            ))}
          </div>
        </div>

        <div className="games-grid">
          {filteredGames.map((game, index) => (
            <GameCard
              key={game.id}
              ref={el => cardsRef.current[index] = el}
              game={game}
              onPlay={() => startGame(game.id)}
              isLoading={isLoading}
            />
          ))}
        </div>

        {filteredGames.length === 0 && (
          <div className="no-games">
            <IoGameController />
            <h3>Nenhum jogo encontrado</h3>
            <p>Tente selecionar outra categoria</p>
          </div>
        )}
      </div>

      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner">
            <IoSparkles />
            <span>Carregando jogo...</span>
          </div>
        </div>
      )}
    </div>
  )
}

export default Games