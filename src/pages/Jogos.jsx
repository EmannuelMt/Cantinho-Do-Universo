import React, { useState } from 'react';
import { Trophy, Star, Clock, Users, Play, Award, TrendingUp, Gamepad } from 'lucide-react';
import './Jogos.css';

const Jogos = () => {
  const [jogoAtivo, setJogoAtivo] = useState(null);
  const [ranking, setRanking] = useState('global');

  const jogos = [
    {
      id: 'quiz',
      nome: 'Quiz do Casal',
      descricao: 'Teste o quanto vocês se conhecem',
      icon: '❓',
      dificuldade: 'Fácil',
      tempo: '5-10 min',
      jogadores: '2 jogadores',
      pontuacao: 850
    },
    {
      id: 'memoria',
      nome: 'Jogo da Memória',
      descricao: 'Encontre os pares das suas fotos',
      icon: '🎴',
      dificuldade: 'Médio',
      tempo: '10-15 min',
      jogadores: '2 jogadores',
      pontuacao: 1200
    },
    {
      id: 'this-or-that',
      nome: 'This or That',
      descricao: 'Escolham entre duas opções',
      icon: '⚖️',
      dificuldade: 'Fácil',
      tempo: '5 min',
      jogadores: '2 jogadores',
      pontuacao: 920
    }
  ];

  const rankings = {
    global: [
      { posicao: 1, nome: 'João & Maria', pontuacao: 1500 },
      { posicao: 2, nome: 'Carlos & Ana', pontuacao: 1450 },
      { posicao: 3, nome: 'Pedro & Julia', pontuacao: 1400 },
      { posicao: 4, nome: 'Vocês', pontuacao: 1350 },
      { posicao: 5, nome: 'Lucas & Sofia', pontuacao: 1300 }
    ],
    mensal: [
      { posicao: 1, nome: 'Vocês', pontuacao: 850 },
      { posicao: 2, nome: 'Carlos & Ana', pontuacao: 800 },
      { posicao: 3, nome: 'João & Maria', pontuacao: 750 }
    ]
  };

  const iniciarJogo = (jogoId) => {
    setJogoAtivo(jogoId);
    // Aqui você iniciaria o jogo real
    setTimeout(() => setJogoAtivo(null), 3000); // Simulação
  };

  const JogoQuiz = () => (
    <div className="jogo-container">
      <h2>Quiz do Casal</h2>
      <div className="pergunta">
        <h3>Pergunta 1/5</h3>
        <p>Qual é a comida favorita do seu parceiro?</p>
        
        <div className="opcoes">
          {['Pizza', 'Sushi', 'Hambúrguer', 'Lasanha'].map((opcao, index) => (
            <button key={index} className="opcao-btn">
              {opcao}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  const JogoMemoria = () => (
    <div className="jogo-container">
      <h2>Jogo da Memória</h2>
      <div className="tabuleiro-memoria">
        {[1, 2, 3, 4, 5, 6].map((carta) => (
          <div key={carta} className="carta-memoria">
            <div className="carta-frente">?</div>
            <div className="carta-verso">🎯</div>
          </div>
        ))}
      </div>
    </div>
  );

  const JogoThisOrThat = () => (
    <div className="jogo-container">
      <h2>This or That</h2>
      <div className="opcoes-thisorthat">
        <button className="opcao-grande">
          <span>🏖️</span>
          <span>Praia</span>
        </button>
        <div className="vs">VS</div>
        <button className="opcao-grande">
          <span>🏔️</span>
          <span>Montanha</span>
        </button>
      </div>
    </div>
  );

  const renderJogoAtivo = () => {
    switch (jogoAtivo) {
      case 'quiz':
        return <JogoQuiz />;
      case 'memoria':
        return <JogoMemoria />;
      case 'this-or-that':
        return <JogoThisOrThat />;
      default:
        return null;
    }
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <Gamepad size={32} />
            Nossos Jogos
          </h1>
          <p>Diversão e conexão para o casal 🎮</p>
        </div>
      </div>

      {jogoAtivo ? (
        renderJogoAtivo()
      ) : (
        <>
          {/* Seção de Jogos Disponíveis */}
          <div className="jogos-section">
            <h2>Escolha um Jogo</h2>
            <div className="jogos-grid">
              {jogos.map((jogo) => (
                <div key={jogo.id} className="jogo-card">
                  <div className="jogo-icon">{jogo.icon}</div>
                  
                  <div className="jogo-info">
                    <h3>{jogo.nome}</h3>
                    <p>{jogo.descricao}</p>
                    
                    <div className="jogo-meta">
                      <span title="Dificuldade">
                        <Star size={14} />
                        {jogo.dificuldade}
                      </span>
                      <span title="Tempo">
                        <Clock size={14} />
                        {jogo.tempo}
                      </span>
                      <span title="Jogadores">
                        <Users size={14} />
                        {jogo.jogadores}
                      </span>
                    </div>

                    <div className="jogo-pontuacao">
                      <Trophy size={16} />
                      Melhor: {jogo.pontuacao} pts
                    </div>
                  </div>

                  <button 
                    className="btn-jogar"
                    onClick={() => iniciarJogo(jogo.id)}
                  >
                    <Play size={20} />
                    Jogar
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Ranking */}
          <div className="ranking-section">
            <div className="ranking-header">
              <h2>
                <Trophy size={28} />
                Ranking do Casal
              </h2>
              
              <div className="ranking-tabs">
                <button 
                  className={`tab-btn ${ranking === 'global' ? 'active' : ''}`}
                  onClick={() => setRanking('global')}
                >
                  Global
                </button>
                <button 
                  className={`tab-btn ${ranking === 'mensal' ? 'active' : ''}`}
                  onClick={() => setRanking('mensal')}
                >
                  Este Mês
                </button>
              </div>
            </div>

            <div className="ranking-list">
              {rankings[ranking].map((item) => (
                <div 
                  key={item.posicao} 
                  className={`ranking-item ${item.nome === 'Vocês' ? 'destaque' : ''}`}
                >
                  <div className="ranking-posicao">
                    {item.posicao <= 3 ? (
                      <Award size={20} className={`medalha-${item.posicao}`} />
                    ) : (
                      <span>#{item.posicao}</span>
                    )}
                  </div>
                  
                  <div className="ranking-info">
                    <span className="ranking-nome">{item.nome}</span>
                    {item.nome === 'Vocês' && <span className="badge-voces">Vocês</span>}
                  </div>
                  
                  <div className="ranking-pontos">
                    <TrendingUp size={16} />
                    {item.pontuacao} pts
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Seção de Conquistas */}
          <div className="conquistas-section">
            <h2>Conquistas</h2>
            <div className="conquistas-grid">
              {[
                { icone: '🏆', titulo: 'Primeiro Jogo', descricao: 'Jogou pela primeira vez', conquistada: true },
                { icone: '⭐', titulo: 'Quiz Mestre', descricao: 'Acertou 10 perguntas', conquistada: true },
                { icone: '⚡', titulo: 'Memória Afiada', descricao: 'Completou em menos de 1 minuto', conquistada: false },
                { icone: '❤️', titulo: 'Casal Perfeito', descricao: '100% de compatibilidade', conquistada: false }
              ].map((conquista, index) => (
                <div 
                  key={index} 
                  className={`conquista-card ${conquista.conquistada ? 'conquistada' : 'bloqueada'}`}
                >
                  <div className="conquista-icone">{conquista.icone}</div>
                  <div className="conquista-info">
                    <h4>{conquista.titulo}</h4>
                    <p>{conquista.descricao}</p>
                  </div>
                  {conquista.conquistada ? (
                    <span className="badge-conquistada">Conquistada!</span>
                  ) : (
                    <span className="badge-bloqueada">Em progresso</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Jogos;