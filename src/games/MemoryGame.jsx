import { useState, useEffect } from 'react';
import './MemoryGame.css';

const MemoryGame = () => {
  // Defina suas fotos do casal aqui (substitua pelos caminhos reais das imagens)
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

  // Inicializa o jogo
  const initializeGame = () => {
    // Verifica se há fotos suficientes (pelo menos 3 pares)
    if (!couplePhotos || couplePhotos.length < 3) {
      console.error('Adicione pelo menos 3 fotos diferentes em couplePhotos');
      return;
    }

    // Seleciona 3 fotos aleatórias (6 cartas no total)
    const selectedPhotos = [...couplePhotos]
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    // Cria pares de cartas
    const gameCards = [...selectedPhotos, ...selectedPhotos]
      .sort(() => 0.5 - Math.random())
      .map((photo, index) => ({
        id: index,
        photo,
        flipped: false
      }));

    setCards(gameCards);
    setFlipped([]);
    setSolved([]);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const handleCardClick = (id) => {
    if (disabled || flipped.includes(id) || solved.includes(id)) return;

    const newFlipped = [...flipped, id];
    setFlipped(newFlipped);

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
      resetCards();
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

  return (
    <div className="memory-game">
      <h2>Jogo da Memória do Casal</h2>
      <div className="cards-grid">
        {cards.map(card => (
          <div
            key={card.id}
            className={`memory-card ${
              flipped.includes(card.id) || solved.includes(card.id) ? 'flipped' : ''
            }`}
            onClick={() => handleCardClick(card.id)}
          >
            <div className="card-front"></div>
            <div className="card-back">
              <img src={card.photo} alt="Foto do casal" />
            </div>
          </div>
        ))}
      </div>
      <button onClick={resetGame} className="reset-button">
        Reiniciar Jogo
      </button>
    </div>
  );
};

export default MemoryGame;