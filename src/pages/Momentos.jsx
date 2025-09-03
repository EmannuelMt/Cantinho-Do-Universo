import React, { useState, useEffect } from 'react';
import { Plus, Heart, Calendar, MapPin, Tag, Smile } from 'lucide-react';
import './Momentos.css';

const Momentos = () => {
  const [momentos, setMomentos] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // Dados de exemplo
  const momentosExemplo = [
    {
      id: 1,
      titulo: 'Nosso primeiro encontro',
      descricao: 'Foi no cinema, estávamos tão nervosos! Assistimos um filme de romance e comemos pipoca.',
      data: '2023-01-15',
      local: 'Cinema Shopping',
      humor: 'nervoso',
      tags: ['primeira vez', 'cinema', 'nervoso'],
      fotos: []
    },
    {
      id: 2,
      titulo: 'Dia na praia',
      descricao: 'Passamos o dia na praia, tomamos sol, nadamos e comemos peixe frito na beira da praia.',
      data: '2023-02-20',
      local: 'Praia do Futuro',
      humor: 'feliz',
      tags: ['praia', 'verão', 'diversão'],
      fotos: []
    }
  ];

  useEffect(() => {
    // Simular carregamento de dados
    setTimeout(() => {
      setMomentos(momentosExemplo);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Carregando momentos...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <Calendar size={32} />
            Nossos Momentos
          </h1>
          <p>Cada momento especial que vivemos juntos 💖</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setShowForm(!showForm)}
        >
          <Plus size={20} />
          Novo Momento
        </button>
      </div>

      {showForm && (
        <div className="momento-form">
          <h3>Criar Novo Momento</h3>
          <form>
            <div className="form-group">
              <label>Título do momento</label>
              <input type="text" placeholder="Ex: Nosso primeiro jantar" />
            </div>
            <div className="form-group">
              <label>Descrição</label>
              <textarea placeholder="Conte detalhes desse momento especial..." rows="3"></textarea>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Data</label>
                <input type="date" />
              </div>
              <div className="form-group">
                <label>Local</label>
                <input type="text" placeholder="Onde foi?" />
              </div>
            </div>
            <div className="form-actions">
              <button type="button" className="btn-secondary">Cancelar</button>
              <button type="submit" className="btn-primary">Salvar Momento</button>
            </div>
          </form>
        </div>
      )}

      <div className="momentos-grid">
        {momentos.map((momento) => (
          <div key={momento.id} className="momento-card">
            <div className="momento-header">
              <h3>{momento.titulo}</h3>
              <span className="momento-date">{momento.data}</span>
            </div>
            
            {momento.local && (
              <div className="momento-local">
                <MapPin size={16} />
                {momento.local}
              </div>
            )}

            <p className="momento-descricao">{momento.descricao}</p>
            
            <div className="momento-footer">
              <div className="momento-humor">
                <Smile size={16} />
                <span>{momento.humor}</span>
              </div>
              
              {momento.tags.length > 0 && (
                <div className="momento-tags">
                  {momento.tags.map(tag => (
                    <span key={tag} className="tag">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="momento-actions">
              <button className="btn-icon">
                <Heart size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {momentos.length === 0 && (
        <div className="empty-state">
          <Calendar size={64} />
          <h3>Nenhum momento ainda</h3>
          <p>Que tal registrar seu primeiro momento especial juntos?</p>
          <button className="btn-primary">
            <Plus size={20} />
            Criar Primeiro Momento
          </button>
        </div>
      )}
    </div>
  );
};

export default Momentos;