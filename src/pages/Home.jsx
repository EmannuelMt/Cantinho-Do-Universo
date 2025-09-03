import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { 
  FaHeart, 
  FaCalendarAlt, 
  FaImages, 
  FaMusic, 
  FaEnvelope, 
  FaGamepad,
  FaPlus,
  FaClock,
  FaUserFriends,
  FaRocket,
  FaStar,
  FaRegCommentDots,
  FaRegHeart,
  FaRegBookmark,
  FaCog
} from 'react-icons/fa';
import { 
  GiLovers, 
  GiPhotoCamera, 
  GiLoveLetter,
  GiPartyPopper
} from 'react-icons/gi';
import { 
  IoMdPhotos, 
  IoMdMusicalNotes, 
  IoMdMail, 
  IoMdTrophy,
  IoMdHelpCircle
} from 'react-icons/io';
import { MdEmojiPeople, MdOutlineWorkspacePremium } from 'react-icons/md';
import { RiHeartAddFill } from 'react-icons/ri';
import './Home.css';

const Home = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('momentos');
  const [stats, setStats] = useState({
    momentos: 0,
    fotos: 0,
    musicas: 0,
    cartas: 0,
    jogos: 0
  });
  const [content, setContent] = useState({
    momentos: [],
    fotos: [],
    musicas: [],
    cartas: [],
    jogos: []
  });
  const [loading, setLoading] = useState(true);

  // Simulação de dados reais do usuário
  useEffect(() => {
    const loadUserData = () => {
      // Dados de exemplo - em uma aplicação real, viriam de uma API
      const userStats = {
        momentos: 15,
        fotos: 47,
        musicas: 8,
        cartas: 3,
        jogos: 12
      };

      const userContent = {
        momentos: [
          { id: 1, titulo: 'Jantar Romântico', data: '2023-12-10', descricao: 'Nosso jantar especial no restaurante italiano', humor: 'feliz', tags: ['jantar', 'romântico'] },
          { id: 2, titulo: 'Dia na Praia', data: '2023-11-25', descricao: 'Dia ensolarado na praia do futuro', humor: 'animado', tags: ['praia', 'verão'] },
          { id: 3, titulo: 'Aniversário de Namoro', data: '2023-10-15', descricao: 'Comemorando 1 ano juntos!', humor: 'apaixonado', tags: ['aniversário', 'especial'] }
        ],
        fotos: [
          { id: 1, titulo: 'Pôr do Sol', data: '2023-12-05', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400', album: 'Natureza' },
          { id: 2, titulo: 'Selfie Casal', data: '2023-11-20', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400', album: 'Selfies' },
          { id: 3, titulo: 'Jantar Especial', data: '2023-11-15', url: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=400', album: 'Restaurantes' }
        ],
        musicas: [
          { id: 1, titulo: 'Música do Nosso Amor', artista: 'Artista Romântico', duracao: '3:45', data: '2023-12-01' },
          { id: 2, titulo: 'Sempre Juntos', artista: 'Banda do Casal', duracao: '4:20', data: '2023-11-15' },
          { id: 3, titulo: 'Nosso Som', artista: 'Cantor Favorito', duracao: '3:15', data: '2023-11-10' }
        ],
        cartas: [
          { id: 1, titulo: 'Carta de Amor', remetente: 'João', data: '2023-12-05', preview: 'Queria te dizer o quanto você é especial para mim...' },
          { id: 2, titulo: 'Poema Romântico', remetente: 'Maria', data: '2023-11-20', preview: 'Escrevi este poema pensando em você...' },
          { id: 3, titulo: 'Mensagem do Coração', remetente: 'João', data: '2023-11-10', preview: 'Só queria lembrar o quanto te amo...' }
        ],
        jogos: [
          { id: 1, nome: 'Quiz do Casal', pontuacao: 850, data: '2023-12-03', nivel: 'Difícil' },
          { id: 2, nome: 'Jogo da Memória', pontuacao: 1200, data: '2023-11-18', nivel: 'Médio' },
          { id: 3, nome: 'This or That', pontuacao: 920, data: '2023-11-12', nivel: 'Fácil' }
        ]
      };

      setStats(userStats);
      setContent(userContent);
      setLoading(false);
    };

    // Simular tempo de carregamento
    setTimeout(loadUserData, 1500);
  }, []);

  const formatarData = (data) => {
    return new Date(data).toLocaleDateString('pt-BR');
  };

  const renderContent = () => {
    if (loading) {
      return (
        <div className="content-loading">
          <div className="spinner"></div>
          <p>Carregando seus {activeTab}...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'momentos':
        return (
          <div className="content-grid">
            {content.momentos.map((momento, index) => (
              <div key={momento.id} className="content-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="card-header">
                  <h3>{momento.titulo}</h3>
                  <span className="card-date">{formatarData(momento.data)}</span>
                </div>
                <p className="card-descricao">{momento.descricao}</p>
                <div className="card-tags">
                  {momento.tags.map(tag => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
                <div className="card-actions">
                  <button className="btn-icon">
                    <FaRegHeart />
                  </button>
                  <button className="btn-icon">
                    <FaRegCommentDots />
                  </button>
                  <button className="btn-icon">
                    <FaRegBookmark />
                  </button>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'fotos':
        return (
          <div className="photos-grid">
            {content.fotos.map((foto, index) => (
              <div key={foto.id} className="photo-card" data-aos="zoom-in" data-aos-delay={index * 100}>
                <img src={foto.url} alt={foto.titulo} />
                <div className="photo-overlay">
                  <h4>{foto.titulo}</h4>
                  <p>{foto.album} • {formatarData(foto.data)}</p>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'musicas':
        return (
          <div className="music-list">
            {content.musicas.map((musica, index) => (
              <div key={musica.id} className="music-item" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="music-icon">
                  <IoMdMusicalNotes />
                </div>
                <div className="music-info">
                  <h4>{musica.titulo}</h4>
                  <p>{musica.artista}</p>
                </div>
                <div className="music-meta">
                  <span>{musica.duracao}</span>
                  <span>{formatarData(musica.data)}</span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'cartas':
        return (
          <div className="letters-grid">
            {content.cartas.map((carta, index) => (
              <div key={carta.id} className="letter-card" data-aos="fade-up" data-aos-delay={index * 100}>
                <div className="letter-icon">
                  <GiLoveLetter />
                </div>
                <div className="letter-content">
                  <h4>{carta.titulo}</h4>
                  <p>De: {carta.remetente}</p>
                  <p className="letter-preview">{carta.preview}</p>
                  <span className="letter-date">{formatarData(carta.data)}</span>
                </div>
              </div>
            ))}
          </div>
        );
      
      case 'jogos':
        return (
          <div className="games-grid">
            {content.jogos.map((jogo, index) => (
              <div key={jogo.id} className="game-card" data-aos="flip-up" data-aos-delay={index * 100}>
                <div className="game-header">
                  <h4>{jogo.nome}</h4>
                  <span className={`nivel ${jogo.nivel.toLowerCase()}`}>{jogo.nivel}</span>
                </div>
                <div className="game-stats">
                  <div className="stat">
                    <span className="stat-value">{jogo.pontuacao}</span>
                    <span className="stat-label">Pontos</span>
                  </div>
                  <div className="stat">
                    <span className="stat-value">{formatarData(jogo.data)}</span>
                    <span className="stat-label">Última jogada</span>
                  </div>
                </div>
                <button className="btn-play">Jogar Novamente</button>
              </div>
            ))}
          </div>
        );
      
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="home-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Carregando nosso cantinho...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      {/* Seção de Boas-vindas */}
      <section className="welcome-section">
        <div className="welcome-content">
          <div className="welcome-text">
            <h1>
              <GiLovers className="icon-heart" />
              Bem-vinda ao nosso Cantinho, {user?.nome}!
            </h1>
            <p className="welcome-subtitle">
              Aqui cada momento nosso é eternizado com amor 💖
            </p>
          </div>
          
          <div className="welcome-stats">
            <div className="stat-badge">
              <FaCalendarAlt />
              <span>{stats.momentos} Momentos</span>
            </div>
            <div className="stat-badge">
              <FaImages />
              <span>{stats.fotos} Fotos</span>
            </div>
            <div className="stat-badge">
              <FaMusic />
              <span>{stats.musicas} Músicas</span>
            </div>
          </div>
        </div>
      </section>

      {/* Navegação por Conteúdo */}
      <section className="content-navigation">
        <div className="nav-tabs">
          <button 
            className={`nav-tab ${activeTab === 'momentos' ? 'active' : ''}`}
            onClick={() => setActiveTab('momentos')}
          >
            <FaCalendarAlt />
            Momentos
          </button>
          <button 
            className={`nav-tab ${activeTab === 'fotos' ? 'active' : ''}`}
            onClick={() => setActiveTab('fotos')}
          >
            <FaImages />
            Fotos
          </button>
          <button 
            className={`nav-tab ${activeTab === 'musicas' ? 'active' : ''}`}
            onClick={() => setActiveTab('musicas')}
          >
            <FaMusic />
            Músicas
          </button>
          <button 
            className={`nav-tab ${activeTab === 'cartas' ? 'active' : ''}`}
            onClick={() => setActiveTab('cartas')}
          >
            <FaEnvelope />
            Cartas
          </button>
          <button 
            className={`nav-tab ${activeTab === 'jogos' ? 'active' : ''}`}
            onClick={() => setActiveTab('jogos')}
          >
            <FaGamepad />
            Jogos
          </button>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <section className="main-content-section">
        <div className="content-header">
          <h2>
            {activeTab === 'momentos' && <FaCalendarAlt />}
            {activeTab === 'fotos' && <FaImages />}
            {activeTab === 'musicas' && <FaMusic />}
            {activeTab === 'cartas' && <FaEnvelope />}
            {activeTab === 'jogos' && <FaGamepad />}
            Meus {activeTab}
          </h2>
          <button className="btn-add">
            <FaPlus />
            Adicionar
          </button>
        </div>

        {renderContent()}
      </section>

      {/* Seção de Destaques */}
      <section className="highlights-section">
        <h2 className="section-title">
          <IoMdTrophy className="section-icon" />
          Destaques do Nosso Amor
        </h2>
        
        <div className="highlights-grid">
          <div className="highlight-card" data-aos="zoom-in">
            <GiPhotoCamera className="highlight-icon" />
            <h3>Foto do Mês</h3>
            <p>Nosso pôr do sol inesquecível</p>
            <span className="highlight-meta">15 curtidas</span>
          </div>

          <div className="highlight-card" data-aos="zoom-in" data-aos-delay="200">
            <IoMdMusicalNotes className="highlight-icon" />
            <h3>Música Top</h3>
            <p>"Música do Nosso Amor"</p>
            <span className="highlight-meta">Ouvida 23 vezes</span>
          </div>

          <div className="highlight-card" data-aos="zoom-in" data-aos-delay="400">
            <GiLoveLetter className="highlight-icon" />
            <h3>Carta Recente</h3>
            <p>Mensagem especial do coração</p>
            <span className="highlight-meta">5 dias atrás</span>
          </div>
        </div>
      </section>

      {/* Seção Sobre o Site */}
      <section className="about-section">
        <h2 className="section-title">
          <IoMdHelpCircle className="section-icon" />
          Sobre o Cantinho do Universo
        </h2>
        
        <div className="about-content">
          <div className="about-text" data-aos="fade-right">
            <p>
              O <strong>Cantinho do Universo</strong> é um espaço especial criado para guardar 
              cada momento, cada risada, cada olhar e cada segredo do nosso amor. 
            </p>
            <p>
              Aqui, nossas memórias são eternizadas e nosso vínculo se fortalece a cada dia. 
              Desenvolvido com 💖 para casais que acreditam no poder das pequenas coisas 
              e na magia dos grandes momentos.
            </p>
          </div>
          
          <div className="about-features" data-aos="fade-left">
            <div className="feature-item">
              <MdEmojiPeople className="feature-icon" />
              <div>
                <h4>100% Personalizado</h4>
                <p>Feito especialmente para o nosso amor</p>
              </div>
            </div>
            
            <div className="feature-item">
              <FaHeart className="feature-icon" />
              <div>
                <h4>Feito com Amor</h4>
                <p>Cada detalhe pensado em nós</p>
              </div>
            </div>
            
            <div className="feature-item">
              <MdOutlineWorkspacePremium className="feature-icon" />
              <div>
                <h4>Memórias Eternas</h4>
                <p>Nossos momentos guardados para sempre</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de FAQ */}
      <section className="faq-section">
        <h2 className="section-title">
          <FaRegCommentDots className="section-icon" />
          Perguntas Frequentes
        </h2>
        
        <div className="faq-grid">
          <div className="faq-item" data-aos="fade-up">
            <h4>Como adicionar novos momentos?</h4>
            <p>Clique no botão "Adicionar" na seção de Momentos e preencha as informações do seu momento especial.</p>
          </div>
          
          <div className="faq-item" data-aos="fade-up" data-aos-delay="100">
            <h4>Posso convidar meu parceiro?</h4>
            <p>Sim! Nas configurações, você pode enviar um convite para seu parceiro participar do cantinho.</p>
          </div>
          
          <div className="faq-item" data-aos="fade-up" data-aos-delay="200">
            <h4>Meus dados estão seguros?</h4>
            <p>Absolutamente! Seus momentos são privados e apenas vocês dois podem acessá-los.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="cta-section">
        <div className="cta-content" data-aos="fade-up">
          <GiPartyPopper className="cta-icon" />
          <h2>Pronto para criar mais memórias?</h2>
          <p>Comece agora a adicionar novos momentos ao nosso cantinho especial</p>
          <div className="cta-buttons">
            <button className="btn-primary">
              <FaPlus />
              Novo Momento
            </button>
            <button className="btn-secondary">
              <FaCog />
              Configurações
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;