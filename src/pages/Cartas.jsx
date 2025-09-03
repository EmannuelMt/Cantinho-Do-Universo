import React, { useState } from 'react';
import { Plus, Mail, Heart, Clock, Edit3, Trash2, Eye, Calendar, Search } from 'lucide-react';
import './Cartas.css';

const Cartas = () => {
  const [abaAtiva, setAbaAtiva] = useState('recebidas');
  const [cartaSelecionada, setCartaSelecionada] = useState(null);
  const [mostrarEditor, setMostrarEditor] = useState(false);

  const cartas = {
    recebidas: [
      {
        id: 1,
        titulo: 'Meu amor por você',
        remetente: 'João',
        preview: 'Queria te dizer o quanto você é especial para mim...',
        data: '2023-12-01',
        lida: true,
        favorita: true,
        tema: 'romantico'
      },
      {
        id: 2,
        titulo: 'Nosso primeiro mês',
        remetente: 'Maria',
        preview: 'Lembra do nosso primeiro mês juntos? Foi mágico!',
        data: '2023-11-15',
        lida: false,
        favorita: false,
        tema: 'nostalgico'
      }
    ],
    enviadas: [
      {
        id: 3,
        titulo: 'Obrigado por tudo',
        destinatario: 'João',
        preview: 'Queria te agradecer por todos os momentos...',
        data: '2023-12-05',
        enviada: true,
        tema: 'agradecimento'
      }
    ],
    rascunhos: [
      {
        id: 4,
        titulo: 'Carta surpresa',
        preview: 'Tenho uma surpresa especial para você...',
        data: '2023-12-10',
        tema: 'surpresa'
      }
    ]
  };

  const temas = [
    { id: 'romantico', nome: 'Romântico', cor: '#ff6b6b' },
    { id: 'nostalgico', nome: 'Nostálgico', cor: '#4ecdc4' },
    { id: 'divertido', nome: 'Divertido', cor: '#ffe66d' },
    { id: 'surpresa', nome: 'Surpresa', cor: '#6b5b95' },
    { id: 'agradecimento', nome: 'Agradecimento', cor: '#88d8b0' }
  ];

  const abas = [
    { id: 'recebidas', label: 'Recebidas', icon: Mail, count: cartas.recebidas.length },
    { id: 'enviadas', label: 'Enviadas', icon: Mail, count: cartas.enviadas.length },
    { id: 'rascunhos', label: 'Rascunhos', icon: Edit3, count: cartas.rascunhos.length }
  ];

  const abrirCarta = (carta) => {
    setCartaSelecionada(carta);
  };

  const fecharCarta = () => {
    setCartaSelecionada(null);
  };

  const getTema = (temaId) => temas.find(t => t.id === temaId) || temas[0];

  return (
    <div className="page-container">
      <div className="page-header">
        <div className="header-content">
          <h1>
            <Mail size={32} />
            Nossas Cartas
          </h1>
          <p>Mensagens especiais do coração 💌</p>
        </div>
        <button 
          className="btn-primary"
          onClick={() => setMostrarEditor(true)}
        >
          <Plus size={20} />
          Escrever Carta
        </button>
      </div>

      <div className="cartas-content">
        <div className="cartas-sidebar">
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
                  <span className="badge">{aba.count}</span>
                </button>
              );
            })}
          </div>

          <div className="temas-section">
            <h4>Temas</h4>
            {temas.map((tema) => (
              <div key={tema.id} className="tema-item">
                <div 
                  className="tema-color" 
                  style={{ backgroundColor: tema.cor }}
                ></div>
                <span>{tema.nome}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="cartas-list">
          <div className="search-bar">
            <Search size={20} />
            <input type="text" placeholder="Buscar cartas..." />
          </div>

          <div className="cartas-grid">
            {cartas[abaAtiva].map((carta) => {
              const tema = getTema(carta.tema);
              return (
                <div 
                  key={carta.id} 
                  className="carta-card"
                  style={{ borderLeft: `4px solid ${tema.cor}` }}
                  onClick={() => abrirCarta(carta)}
                >
                  <div className="carta-header">
                    <h3>{carta.titulo}</h3>
                    {carta.favorita && <Heart size={16} className="favorita" />}
                  </div>
                  
                  <p className="carta-preview">{carta.preview}</p>
                  
                  <div className="carta-meta">
                    <div className="carta-info">
                      {abaAtiva === 'recebidas' && (
                        <span>De: {carta.remetente}</span>
                      )}
                      {abaAtiva === 'enviadas' && (
                        <span>Para: {carta.destinatario}</span>
                      )}
                      <span>
                        <Clock size={14} />
                        {new Date(carta.data).toLocaleDateString('pt-BR')}
                      </span>
                    </div>
                    
                    {!carta.lida && abaAtiva === 'recebidas' && (
                      <span className="badge-new">Nova</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {cartas[abaAtiva].length === 0 && (
            <div className="empty-state">
              <Mail size={64} />
              <h3>Nenhuma carta aqui</h3>
              <p>
                {abaAtiva === 'recebidas' && 'Você ainda não recebeu cartas.'}
                {abaAtiva === 'enviadas' && 'Você ainda não enviou cartas.'}
                {abaAtiva === 'rascunhos' && 'Você ainda não tem rascunhos.'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal de Visualização de Carta */}
      {cartaSelecionada && (
        <div className="modal-overlay">
          <div className="modal-carta">
            <div className="modal-header">
              <h2>{cartaSelecionada.titulo}</h2>
              <button onClick={fecharCarta}>×</button>
            </div>
            
            <div className="carta-content">
              <div className="carta-meta">
                {abaAtiva === 'recebidas' && (
                  <p><strong>De:</strong> {cartaSelecionada.remetente}</p>
                )}
                {abaAtiva === 'enviadas' && (
                  <p><strong>Para:</strong> {cartaSelecionada.destinatario}</p>
                )}
                <p><strong>Data:</strong> {new Date(cartaSelecionada.data).toLocaleDateString('pt-BR')}</p>
              </div>

              <div className="carta-texto">
                <p>Querida [Nome],</p>
                <p>{cartaSelecionada.preview} Esta é uma carta completa com todo o amor que sinto por você. Cada momento ao seu lado é especial e quero que saiba o quanto você significa para mim.</p>
                <p>Com todo meu amor,</p>
                <p>[Seu Nome]</p>
              </div>

              <div className="carta-actions">
                <button className="btn-icon">
                  <Heart size={20} />
                </button>
                <button className="btn-icon">
                  <Trash2 size={20} />
                </button>
                <button className="btn-icon">
                  <Edit3 size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Editor de Cartas */}
      {mostrarEditor && (
        <div className="modal-overlay">
          <div className="editor-carta">
            <div className="modal-header">
              <h2>Escrever Nova Carta</h2>
              <button onClick={() => setMostrarEditor(false)}>×</button>
            </div>

            <div className="editor-content">
              <div className="form-group">
                <label>Título da carta</label>
                <input type="text" placeholder="Ex: Meu amor por você" />
              </div>

              <div className="form-group">
                <label>Destinatário</label>
                <input type="text" placeholder="Para quem é esta carta?" />
              </div>

              <div className="form-group">
                <label>Tema</label>
                <select>
                  {temas.map(tema => (
                    <option key={tema.id} value={tema.id}>
                      {tema.nome}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Data de entrega (opcional)</label>
                <input type="date" />
              </div>

              <div className="form-group">
                <label>Sua carta</label>
                <textarea 
                  placeholder="Escreva sua mensagem especial..."
                  rows="8"
                ></textarea>
              </div>

              <div className="editor-actions">
                <button className="btn-secondary">Salvar Rascunho</button>
                <button className="btn-primary">Enviar Carta</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cartas;