import React, { useState } from 'react';
import { Play, Pause, Heart, Plus, Music, Clock } from 'lucide-react';
import './Musicas.css';

const Musicas = () => {
  const [musicas] = useState([
    {
      id: 1,
      titulo: 'Música do Nosso Amor',
      artista: 'Artista Romântico',
      duracao: '3:45',
      favorita: true
    },
    {
      id: 2,
      titulo: 'Sempre juntos',
      artista: 'Banda do Casal',
      duracao: '4:20',
      favorita: false
    }
  ]);
  const [playing, setPlaying] = useState(null);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <Music size={32} />
            Nossas Músicas
          </h1>
          <p>As trilhas sonoras do nosso amor 🎵</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Adicionar Música
        </button>
      </div>

      <div className="player-section">
        <div className="player-card">
          <div className="player-info">
            <div className="player-album">
              <Music size={48} />
            </div>
            <div className="player-details">
              <h3>Tocando agora</h3>
              <h2>Música do Nosso Amor</h2>
              <p>Artista Romântico</p>
            </div>
          </div>
          
          <div className="player-controls">
            <button className="btn-icon large">
              {playing ? <Pause size={24} /> : <Play size={24} />}
            </button>
          </div>

          <div className="player-progress">
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '65%' }}></div>
            </div>
            <div className="progress-time">
              <span>2:30</span>
              <span>3:45</span>
            </div>
          </div>
        </div>
      </div>

      <div className="musicas-list">
        <h2>Nossa Playlist</h2>
        
        <div className="table-header">
          <span>#</span>
          <span>Título</span>
          <span>Artista</span>
          <span><Clock size={16} /></span>
          <span></span>
        </div>

        {musicas.map((musica, index) => (
          <div key={musica.id} className="musica-row">
            <span className="track-number">{index + 1}</span>
            <span className="track-title">{musica.titulo}</span>
            <span className="track-artist">{musica.artista}</span>
            <span className="track-duration">{musica.duracao}</span>
            <button className={`btn-icon ${musica.favorita ? 'favorita' : ''}`}>
              <Heart size={16} />
            </button>
          </div>
        ))}
      </div>

      <div className="playlists-section">
        <h2>Nossas Playlists</h2>
        <div className="playlists-grid">
          <div className="playlist-card">
            <div className="playlist-icon">
              <Music size={32} />
            </div>
            <h3>Românticas</h3>
            <p>12 músicas</p>
          </div>
          <div className="playlist-card">
            <div className="playlist-icon">
              <Music size={32} />
            </div>
            <h3>Festa</h3>
            <p>8 músicas</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Musicas;