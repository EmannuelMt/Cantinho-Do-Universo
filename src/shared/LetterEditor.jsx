import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaSave, FaPaperPlane, FaLock, FaLockOpen, FaTrash } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import PdfExporter from './PdfExporter';
import { useDatabase } from '../../hooks/useDatabase';
import './LetterEditor.css';

const LetterEditor = () => {
  const { letters, addLetter } = useDatabase();
  const [letter, setLetter] = useState({
    title: '',
    content: '',
    isPrivate: true,
    author: '',
    mood: 'happy'
  });
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentLetterId, setCurrentLetterId] = useState(null);

  const moods = [
    { value: 'happy', emoji: '😊', label: 'Feliz' },
    { value: 'love', emoji: '🥰', label: 'Amoroso' },
    { value: 'funny', emoji: '😂', label: 'Engraçado' },
    { value: 'sad', emoji: '😢', label: 'Triste' },
    { value: 'surprise', emoji: '😲', label: 'Surpresa' }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    const newLetter = {
      ...letter,
      date: new Date().toLocaleDateString('pt-BR'),
      id: isEditing ? currentLetterId : Date.now()
    };

    addLetter(newLetter);
    resetForm();
  };

  const resetForm = () => {
    setLetter({
      title: '',
      content: '',
      isPrivate: true,
      author: '',
      mood: 'happy'
    });
    setIsEditing(false);
    setCurrentLetterId(null);
  };

  const handleEdit = (letterToEdit) => {
    setLetter(letterToEdit);
    setIsEditing(true);
    setCurrentLetterId(letterToEdit.id);
  };

  const handleDelete = (id) => {
    // Implemente a lógica de deleção aqui
    console.log('Carta deletada:', id);
  };

  return (
    <div className="letter-editor-container">
      <motion.div 
        className="editor-section"
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
      >
        <h2>{isEditing ? 'Editar Carta' : 'Nova Carta'}</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={letter.title}
              onChange={(e) => setLetter({...letter, title: e.target.value})}
              placeholder="Minha carta especial"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Autor</label>
              <input
                type="text"
                value={letter.author}
                onChange={(e) => setLetter({...letter, author: e.target.value})}
                placeholder="Seu nome"
                required
              />
            </div>

            <div className="form-group">
              <label>Estado de Ânimo</label>
              <select
                value={letter.mood}
                onChange={(e) => setLetter({...letter, mood: e.target.value})}
              >
                {moods.map(mood => (
                  <option key={mood.value} value={mood.value}>
                    {mood.emoji} {mood.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Mensagem</label>
            <textarea
              value={letter.content}
              onChange={(e) => setLetter({...letter, content: e.target.value})}
              placeholder="Escreva seu coração aqui..."
              rows="8"
              required
            />
            
            <div className="editor-toolbar">
              <button 
                type="button"
                className="emoji-btn"
                onClick={() => setShowEmojiPicker(!showEmojiPicker)}
              >
                😊 Adicionar Emoji
              </button>

              <button
                type="button"
                className={`privacy-btn ${letter.isPrivate ? 'private' : 'public'}`}
                onClick={() => setLetter({...letter, isPrivate: !letter.isPrivate})}
              >
                {letter.isPrivate ? <FaLock /> : <FaLockOpen />}
                {letter.isPrivate ? ' Privada' : ' Pública'}
              </button>
            </div>

            {showEmojiPicker && (
              <div className="emoji-picker-wrapper">
                <EmojiPicker 
                  onEmojiClick={(emojiData) => {
                    setLetter({...letter, content: letter.content + emojiData.emoji});
                    setShowEmojiPicker(false);
                  }}
                />
              </div>
            )}
          </div>

          <div className="form-actions">
            <motion.button
              type="submit"
              className="save-btn"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaSave /> {isEditing ? 'Atualizar' : 'Salvar'}
            </motion.button>

            {isEditing && (
              <button
                type="button"
                className="cancel-btn"
                onClick={resetForm}
              >
                Cancelar
              </button>
            )}

            <PdfExporter 
              content={{
                title: letter.title,
                text: letter.content,
                author: letter.author,
                date: new Date().toLocaleDateString('pt-BR')
              }} 
            />
          </div>
        </form>
      </motion.div>

      <div className="letters-list">
        <h3>Cartas Salvas</h3>
        {letters.length === 0 ? (
          <p className="empty-message">Nenhuma carta salva ainda...</p>
        ) : (
          letters.map((letterItem) => (
            <motion.div 
              key={letterItem.id}
              className="letter-card"
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="letter-header">
                <h4>{letterItem.title}</h4>
                <span className="letter-meta">
                  {letterItem.date} • {letterItem.isPrivate ? 'Privada' : 'Pública'} • 
                  {moods.find(m => m.value === letterItem.mood)?.emoji}
                </span>
              </div>
              
              <div className="letter-content-preview">
                {letterItem.content.substring(0, 150)}...
              </div>
              
              <div className="letter-actions">
                <button 
                  className="edit-btn"
                  onClick={() => handleEdit(letterItem)}
                >
                  Editar
                </button>
                <button 
                  className="delete-btn"
                  onClick={() => handleDelete(letterItem.id)}
                >
                  <FaTrash />
                </button>
                <PdfExporter 
                  content={{
                    title: letterItem.title,
                    text: letterItem.content,
                    author: letterItem.author,
                    date: letterItem.date
                  }} 
                />
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default LetterEditor;