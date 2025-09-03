import React, { useState } from 'react';
import { User, Settings, Heart, Calendar, Image, Music, Mail, Gamepad, Edit3, Camera } from 'lucide-react';
import './Perfil.css';

const Perfil = () => {
  const [abaAtiva, setAbaAtiva] = useState('sobre');
  const [usuario] = useState({
    nome: 'Manu Silva',
    apelido: 'Manuzinha',
    email: 'manu@exemplo.com',
    dataAniversario: '1998-06-15',
    fotoPerfil: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
    dataCriacao: '2023-01-15',
    sobre: 'Amo viajar, fotografia e momentos especiais com meu amor 💖',
    stats: {
      momentos: 24,
      fotos: 156,
      musicas: 18,
      cartas: 8,
      jogos: 12
    }
  });

  const abas = [
    { id: 'sobre', label: 'Sobre', icon: User },
    { id: 'momentos', label: 'Momentos', icon: Calendar },
    { id: 'album', label: 'Fotos', icon: Image },
    { id: 'musicas', label: 'Músicas', icon: Music },
    { id: 'cartas', label: 'Cartas', icon: Mail },
    { id: 'jogos', label: 'Jogos', icon: Gamepad },
    { id: 'configuracoes', label: 'Configurações', icon: Settings }
  ];

  const renderConteudoAba = () => {
    switch (abaAtiva) {
      case 'sobre':
        return <AbaSobre usuario={usuario} />;
      case 'momentos':
        return <AbaMomentos />;
      case 'album':
        return <AbaAlbum />;
      case 'musicas':
        return <AbaMusicas />;
      case 'cartas':
        return <AbaCartas />;
      case 'jogos':
        return <AbaJogos />;
      case 'configuracoes':
        return <AbaConfiguracoes usuario={usuario} />;
      default:
        return <AbaSobre usuario={usuario} />;
    }
  };

  return (
    <div className="page-container">
      <div className="perfil-header">
        <div className="perfil-banner">
          <div className="banner-overlay">
            <div className="perfil-info">
              <div className="foto-perfil">
                <img src={usuario.fotoPerfil} alt={usuario.nome} />
                <button className="btn-edit-foto">
                  <Camera size={16} />
                </button>
              </div>
              
              <div className="perfil-detalhes">
                <h1>{usuario.nome}</h1>
                <p className="apelido">@{usuario.apelido}</p>
                <p className="bio">{usuario.sobre}</p>
                
                <div className="perfil-stats">
                  <div className="stat">
                    <strong>{usuario.stats.momentos}</strong>
                    <span>Momentos</span>
                  </div>
                  <div className="stat">
                    <strong>{usuario.stats.fotos}</strong>
                    <span>Fotos</span>
                  </div>
                  <div className="stat">
                    <strong>{usuario.stats.cartas}</strong>
                    <span>Cartas</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="perfil-content">
        <div className="abas-navegacao">
          {abas.map((aba) => {
            const Icon = aba.icon;
            return (
              <button
                key={aba.id}
                className={`aba-btn ${abaAtiva === aba.id ? 'active' : ''}`}
                onClick={() => setAbaAtiva(aba.id)}
              >
                <Icon size={18} />
                {aba.label}
              </button>
            );
          })}
        </div>

        <div className="aba-conteudo">
          {renderConteudoAba()}
        </div>
      </div>
    </div>
  );
};

// Componentes das Abas
const AbaSobre = ({ usuario }) => (
  <div className="aba-sobre">
    <div className="info-card">
      <h3>Informações Pessoais</h3>
      <div className="info-grid">
        <div className="info-item">
          <strong>Nome completo</strong>
          <span>{usuario.nome}</span>
        </div>
        <div className="info-item">
          <strong>Apelido</strong>
          <span>@{usuario.apelido}</span>
        </div>
        <div className="info-item">
          <strong>Email</strong>
          <span>{usuario.email}</span>
        </div>
        <div className="info-item">
          <strong>Data de nascimento</strong>
          <span>{new Date(usuario.dataAniversario).toLocaleDateString('pt-BR')}</span>
        </div>
        <div className="info-item">
          <strong>Membro desde</strong>
          <span>{new Date(usuario.dataCriacao).toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </div>

    <div className="info-card">
      <h3>Sobre mim</h3>
      <p>{usuario.sobre}</p>
    </div>

    <div className="info-card">
      <h3>Estatísticas</h3>
      <div className="stats-grid">
        <div className="stat-card">
          <Calendar size={24} />
          <div>
            <strong>{usuario.stats.momentos}</strong>
            <span>Momentos</span>
          </div>
        </div>
        <div className="stat-card">
          <Image size={24} />
          <div>
            <strong>{usuario.stats.fotos}</strong>
            <span>Fotos</span>
          </div>
        </div>
        <div className="stat-card">
          <Music size={24} />
          <div>
            <strong>{usuario.stats.musicas}</strong>
            <span>Músicas</span>
          </div>
        </div>
        <div className="stat-card">
          <Mail size={24} />
          <div>
            <strong>{usuario.stats.cartas}</strong>
            <span>Cartas</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const AbaMomentos = () => (
  <div className="aba-momentos">
    <h3>Meus Momentos</h3>
    <div className="momentos-list">
      {[1, 2, 3].map((id) => (
        <div key={id} className="momento-item">
          <div className="momento-content">
            <h4>Momento especial #{id}</h4>
            <p>Descrição do momento incrível que vivemos juntos...</p>
            <span className="momento-date">15/01/2023</span>
          </div>
          <div className="momento-actions">
            <button className="btn-icon">
              <Edit3 size={16} />
            </button>
            <button className="btn-icon">
              <Heart size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const AbaAlbum = () => (
  <div className="aba-album">
    <h3>Minhas Fotos</h3>
    <div className="fotos-grid">
      {[1, 2, 3, 4, 5, 6].map((id) => (
        <div key={id} className="foto-item">
          <img 
            src={`https://images.unsplash.com/photo-${1500000000000 + id}?w=200`} 
            alt={`Foto ${id}`} 
          />
        </div>
      ))}
    </div>
  </div>
);

const AbaMusicas = () => (
  <div className="aba-musicas">
    <h3>Minhas Músicas</h3>
    <div className="musicas-list">
      {['Música do Amor', 'Sempre Juntos', 'Nosso Som'].map((musica, index) => (
        <div key={index} className="musica-item">
          <Music size={20} />
          <div className="musica-info">
            <strong>{musica}</strong>
            <span>Artista Romântico</span>
          </div>
          <span className="musica-duracao">3:45</span>
        </div>
      ))}
    </div>
  </div>
);

const AbaCartas = () => (
  <div className="aba-cartas">
    <h3>Minhas Cartas</h3>
    <div className="cartas-list">
      {['Carta de Amor', 'Poema Especial', 'Mensagem do Coração'].map((carta, index) => (
        <div key={index} className="carta-item">
          <Mail size={20} />
          <div className="carta-info">
            <strong>{carta}</strong>
            <span>Enviada em 15/01/2023</span>
          </div>
          <span className="carta-status">Lida ✓</span>
        </div>
      ))}
    </div>
  </div>
);

const AbaJogos = () => (
  <div className="aba-jogos">
    <h3>Meus Jogos</h3>
    <div className="jogos-stats">
      <div className="jogo-stat">
        <strong>Quiz do Casal</strong>
        <span>Pontuação: 850</span>
      </div>
      <div className="jogo-stat">
        <strong>Jogo da Memória</strong>
        <span>Melhor tempo: 1:30</span>
      </div>
      <div className="jogo-stat">
        <strong>This or That</strong>
        <span>Acertos: 92%</span>
      </div>
    </div>
  </div>
);

const AbaConfiguracoes = ({ usuario }) => (
  <div className="aba-configuracoes">
    <h3>Configurações</h3>
    
    <div className="config-section">
      <h4>Perfil</h4>
      <div className="config-form">
        <div className="form-group">
          <label>Nome completo</label>
          <input type="text" defaultValue={usuario.nome} />
        </div>
        <div className="form-group">
          <label>Apelido</label>
          <input type="text" defaultValue={usuario.apelido} />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" defaultValue={usuario.email} />
        </div>
        <div className="form-group">
          <label>Data de nascimento</label>
          <input type="date" defaultValue={usuario.dataAniversario} />
        </div>
        <div className="form-group">
          <label>Sobre mim</label>
          <textarea defaultValue={usuario.sobre} rows="3" />
        </div>
        <button className="btn-primary">Salvar Alterações</button>
      </div>
    </div>

    <div className="config-section">
      <h4>Privacidade</h4>
      <div className="config-options">
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span>Perfil público</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span>Permitir mensagens</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" />
          <span>Mostrar data de nascimento</span>
        </label>
      </div>
    </div>

    <div className="config-section">
      <h4>Notificações</h4>
      <div className="config-options">
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span>Notificações por email</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span>Notificações de novas cartas</span>
        </label>
        <label className="checkbox-label">
          <input type="checkbox" defaultChecked />
          <span>Lembretes de datas especiais</span>
        </label>
      </div>
    </div>

    <div className="config-section">
      <h4>Conta</h4>
      <div className="config-actions">
        <button className="btn-secondary">Alterar Senha</button>
        <button className="btn-danger">Excluir Conta</button>
      </div>
    </div>
  </div>
);

export default Perfil;