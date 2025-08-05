import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaComment, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './PhotoGallery.css';

const PhotoGallery = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [favorites, setFavorites] = useState([]);

  const categories = ['Todas', 'Viagens', 'Dias Normais', 'Festas', 'Datas Especiais'];

  const toggleFavorite = (photoId) => {
    if (favorites.includes(photoId)) {
      setFavorites(favorites.filter(id => id !== photoId));
    } else {
      setFavorites([...favorites, photoId]);
    }
  };

  const filteredPhotos = selectedCategory === 'Todas' 
    ? photos 
    : photos.filter(photo => photo.category === selectedCategory);

  return (
    <div className="photo-gallery">
      <div className="gallery-controls">
        {categories.map(category => (
          <button
            key={category}
            className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="photos-grid">
        {filteredPhotos.map(photo => (
          <motion.div
            key={photo.id}
            className="photo-card"
            layout
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedPhoto(photo)}
          >
            <img src={photo.url} alt={photo.title} />
            <div className="photo-overlay">
              <button 
                className={`like-btn ${favorites.includes(photo.id) ? 'liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleFavorite(photo.id);
                }}
              >
                <FaHeart />
              </button>
              <span className="photo-date">{photo.date}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPhoto && (
          <motion.div 
            className="photo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button 
              className="close-modal"
              onClick={() => setSelectedPhoto(null)}
            >
              <FaTimes />
            </button>
            
            <div className="modal-content">
              <img src={selectedPhoto.url} alt={selectedPhoto.title} />
              
              <div className="photo-details">
                <h3>{selectedPhoto.title}</h3>
                <p>{selectedPhoto.description}</p>
                <div className="photo-actions">
                  <button 
                    className={`like-btn ${favorites.includes(selectedPhoto.id) ? 'liked' : ''}`}
                    onClick={() => toggleFavorite(selectedPhoto.id)}
                  >
                    <FaHeart /> Curtir
                  </button>
                  <button className="comment-btn">
                    <FaComment /> Comentar
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;