import React, { useState } from 'react';
import { Plus, Image, Heart, Download, Share } from 'lucide-react';
import './Album.css';

const Album = () => {
  const [albuns] = useState([
    {
      id: 1,
      titulo: 'Férias na Praia',
      descricao: 'Nossos dias de verão 2023',
      capa: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400',
      fotos: 24,
      data: '2023-02-15'
    },
    {
      id: 2,
      titulo: 'Aniversário de Namoro',
      descricao: '1 ano juntos!',
      capa: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400',
      fotos: 18,
      data: '2023-10-15'
    }
  ]);

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <Image size={32} />
            Nosso Álbum
          </h1>
          <p>Todas as nossas fotos e lembranças 📸</p>
        </div>
        <button className="btn-primary">
          <Plus size={20} />
          Novo Álbum
        </button>
      </div>

      <div className="albuns-grid">
        {albuns.map((album) => (
          <div key={album.id} className="album-card">
            <div className="album-capa">
              <img src={album.capa} alt={album.titulo} />
              <div className="album-overlay">
                <button className="btn-icon">
                  <Heart size={20} />
                </button>
                <button className="btn-icon">
                  <Download size={20} />
                </button>
                <button className="btn-icon">
                  <Share size={20} />
                </button>
              </div>
            </div>
            
            <div className="album-info">
              <h3>{album.titulo}</h3>
              <p>{album.descricao}</p>
              
              <div className="album-meta">
                <span>{album.fotos} fotos</span>
                <span>•</span>
                <span>{album.data}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="recent-photos">
        <h2>Fotos Recentes</h2>
        <div className="photos-grid">
          {[1, 2, 3, 4, 5, 6].map((id) => (
            <div key={id} className="photo-item">
              <img 
                src={`https://images.unsplash.com/photo-${1500000000000 + id}?w=200`} 
                alt={`Foto ${id}`} 
              />
              <div className="photo-actions">
                <button className="btn-icon">
                  <Heart size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Album;