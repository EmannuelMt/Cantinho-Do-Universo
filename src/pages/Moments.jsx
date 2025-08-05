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
      <div className="moments-header">
        <h1>Nossos Momentos</h1>
        
        <div className="controls">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input
              type="text"
              placeholder="Buscar momentos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="category-filter">
            {categories.map(category => (
              <button
                key={category}
                className={selectedCategory === category ? 'active' : ''}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      <motion.button
        className="add-memory-btn"
        onClick={() => setShowUploadModal(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus /> Adicionar Memória
      </motion.button>

      <PhotoGallery 
        photos={filteredPhotos} 
        onPhotoClick={setSelectedPhoto}
        onFavoriteToggle={toggleFavorite}
      />

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
              >
                <FaTimes />
              </button>
              
              <img 
                src={selectedPhoto.imageUrl} 
                alt={selectedPhoto.title} 
                className="modal-photo"
              />
              
              <div className="photo-details">
                <h2>{selectedPhoto.title}</h2>
                <p className="photo-date">{selectedPhoto.date}</p>
                <p className="photo-description">{selectedPhoto.description}</p>
                
                <div className="photo-actions">
                  <button 
                    className={`favorite-btn ${selectedPhoto.favorite ? 'active' : ''}`}
                    onClick={() => {
                      toggleFavorite(selectedPhoto.id);
                      setSelectedPhoto({
                        ...selectedPhoto,
                        favorite: !selectedPhoto.favorite
                      });
                    }}
                  >
                    <FaHeart /> {selectedPhoto.favorite ? 'Favoritado' : 'Favoritar'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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

// Componente auxiliar para upload
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
      className="upload-modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="upload-modal-content"
        initial={{ y: 50 }}
        animate={{ y: 0 }}
        exit={{ y: 50 }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Adicionar Nova Memória</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Título</label>
            <input
              type="text"
              value={newPhoto.title}
              onChange={(e) => setNewPhoto({...newPhoto, title: e.target.value})}
              required
            />
          </div>
          
          <div className="form-group">
            <label>Descrição</label>
            <textarea
              value={newPhoto.description}
              onChange={(e) => setNewPhoto({...newPhoto, description: e.target.value})}
              rows="3"
            />
          </div>
          
          <div className="form-group">
            <label>Categoria</label>
            <select
              value={newPhoto.category}
              onChange={(e) => setNewPhoto({...newPhoto, category: e.target.value})}
            >
              <option value="Datas Especiais">Datas Especiais</option>
              <option value="Viagens">Viagens</option>
              <option value="Dias Normais">Dias Normais</option>
              <option value="Festas">Festas</option>
            </select>
          </div>
          
          <div className="form-group">
            <label>Foto</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required
            />
            {newPhoto.imageUrl && (
              <img 
                src={newPhoto.imageUrl} 
                alt="Preview" 
                className="image-preview"
              />
            )}
          </div>
          
          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">
              Salvar Memória
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Moments;