import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaComment, FaTimes, FaSearch, FaPlus } from 'react-icons/fa';
import PhotoGallery from '../shared/PhotoGallery';
import './Moments.css';

const Moments = () => {
  const [photos, setPhotos] = useState([
    {
      id: 1,
      title: "Nosso primeiro encontro",
      date: "15/01/2023",
      imageUrl: "/assets/images/moment1.jpg",
      category: "Datas Especiais",
      description: "O dia em que tudo começou",
      favorite: true
    },
    // Adicione mais fotos conforme necessário
  ]);

  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [showCategories, setShowCategories] = useState(false);

  

  const categories = ['Todas', 'Datas Especiais', 'Viagens', 'Dias Normais', 'Festas'];

  const toggleFavorite = (photoId) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId ? {...photo, favorite: !photo.favorite} : photo
    ));
  };

  const filteredPhotos = photos
    .filter(photo => 
      selectedCategory === 'Todas' || photo.category === selectedCategory
    )
    .filter(photo => 
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const handleUpload = (newPhoto) => {
    // Implemente o upload real aqui
    setPhotos([newPhoto, ...photos]);
    setShowUploadModal(false);
  };

  return (
    <div className="moments-page">
      <header className="moments-header">
        <h1 className="moments-title">Nossos Momentos</h1>
        
        <div className="moments-controls">
          <div className="search-container">
            <div className="search-bar">
              <FaSearch className="search-icon" />
              <input
                type="text"
                placeholder="Buscar momentos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>
            
            <motion.button
              className="add-memory-btn"
              onClick={() => setShowUploadModal(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaPlus /> Adicionar Memória
            </motion.button>
          </div>
          
          <div className="category-filter">
            {categories.map(category => (
              <motion.button
                key={category}
                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
      </header>

      <main className="moments-content">
        <PhotoGallery 
          photos={filteredPhotos} 
          onPhotoClick={setSelectedPhoto}
          onFavoriteToggle={toggleFavorite}
        />
      </main>

      {/* Modal de visualização de foto */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className="photo-modal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.div 
              className="photo-modal-content"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="close-modal-btn"
                onClick={() => setSelectedPhoto(null)}
                aria-label="Fechar modal"
              >
                <FaTimes />
              </button>
              
              <div className="modal-photo-container">
                <img 
                  src={selectedPhoto.imageUrl} 
                  alt={selectedPhoto.title} 
                  className="modal-photo"
                  loading="lazy"
                />
              </div>
              
              <div className="photo-details">
                <div className="photo-meta">
                  <h2 className="photo-title">{selectedPhoto.title}</h2>
                  <span className="photo-category">{selectedPhoto.category}</span>
                </div>
                <p className="photo-date">{selectedPhoto.date}</p>
                <p className="photo-description">{selectedPhoto.description}</p>
                
                <div className="photo-actions">
                  <motion.button 
                    className={`favorite-btn ${selectedPhoto.favorite ? 'active' : ''}`}
                    onClick={() => {
                      toggleFavorite(selectedPhoto.id);
                      setSelectedPhoto({
                        ...selectedPhoto,
                        favorite: !selectedPhoto.favorite
                      });
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FaHeart /> {selectedPhoto.favorite ? 'Favoritado' : 'Favoritar'}
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de upload */}
      <AnimatePresence>
        {showUploadModal && (
          <UploadModal 
            onClose={() => setShowUploadModal(false)}
            onUpload={handleUpload}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente de Upload Modal
const UploadModal = ({ onClose, onUpload }) => {
  const [newPhoto, setNewPhoto] = useState({
    title: '',
    description: '',
    category: 'Datas Especiais',
    imageFile: null
  });

  const handleFileChange = (e) => {
    setNewPhoto({
      ...newPhoto,
      imageFile: e.target.files[0],
      imageUrl: URL.createObjectURL(e.target.files[0])
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const photoToAdd = {
      ...newPhoto,
      id: Date.now(),
      date: new Date().toLocaleDateString('pt-BR'),
      favorite: false
    };
    onUpload(photoToAdd);
  };

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal-content"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2 className="modal-title">Adicionar Nova Memória</h2>
          <button 
            className="close-btn"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <FaTimes />
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">Título</label>
            <input
              id="title"
              type="text"
              value={newPhoto.title}
              onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
              required
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="description">Descrição</label>
            <textarea
              id="description"
              value={newPhoto.description}
              onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
              rows="3"
              className="form-textarea"
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="category">Categoria</label>
            <select
              id="category"
              value={newPhoto.category}
              onChange={(e) => setNewPhoto({...newPhoto, category: e.target.value})}
              className="form-select"
            >
              <option value="Datas Especiais">Datas Especiais</option>
              <option value="Viagens">Viagens</option>
              <option value="Dias Normais">Dias Normais</option>
              <option value="Festas">Festas</option>
            </select>
          </div>
          
          <div className="form-group">
            <label htmlFor="photo-upload" className="file-upload-label">
              <span>Selecionar Foto</span>
              <input
                id="photo-upload"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                required
                className="file-input"
              />
            </label>
            {newPhoto.imageUrl && (
              <div className="image-preview-container">
                <img 
                  src={newPhoto.imageUrl} 
                  alt="Preview" 
                  className="image-preview"
                />
              </div>
            )}
          </div>
          
          <div className="form-actions">
            <motion.button 
              type="button" 
              onClick={onClose}
              className="secondary-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Cancelar
            </motion.button>
            <motion.button 
              type="submit"
              className="primary-btn"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Salvar Memória
            </motion.button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Moments;