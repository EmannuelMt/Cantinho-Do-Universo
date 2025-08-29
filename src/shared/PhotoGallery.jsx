import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaComment, FaTimes, FaChevronLeft, FaChevronRight, FaUser, FaPaperPlane } from 'react-icons/fa';
import './PhotoGallery.css';

const PhotoGallery = ({ 
  photos, 
  onPhotoClick, 
  onFavoriteToggle 
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState('');
  const [commentUser, setCommentUser] = useState('');

  // Carrega comentários salvos no localStorage ao iniciar
  useEffect(() => {
    const savedComments = localStorage.getItem('photoGalleryComments');
    if (savedComments) {
      setComments(JSON.parse(savedComments));
    }
  }, []);

  // Salva comentários no localStorage quando são atualizados
  useEffect(() => {
    localStorage.setItem('photoGalleryComments', JSON.stringify(comments));
  }, [comments]);

  const handlePhotoClick = (photo, index) => {
    setSelectedPhoto(photo);
    setCurrentIndex(index);
    if (onPhotoClick) onPhotoClick(photo);
  };

  const navigatePhotos = (direction) => {
    let newIndex;
    if (direction === 'prev') {
      newIndex = currentIndex === 0 ? photos.length - 1 : currentIndex - 1;
    } else {
      newIndex = currentIndex === photos.length - 1 ? 0 : currentIndex + 1;
    }
    setSelectedPhoto(photos[newIndex]);
    setCurrentIndex(newIndex);
  };

  const handleAddComment = () => {
    if (!newComment.trim() || !commentUser.trim() || !selectedPhoto) return;

    const photoId = selectedPhoto.id;
    const comment = {
      id: Date.now(),
      user: commentUser,
      text: newComment,
      date: new Date().toLocaleString('pt-BR')
    };

    setComments(prev => ({
      ...prev,
      [photoId]: [...(prev[photoId] || []), comment]
    }));

    setNewComment('');
  };

  const handleKeyDown = (e) => {
    if (selectedPhoto) {
      if (e.key === 'ArrowLeft') navigatePhotos('prev');
      if (e.key === 'ArrowRight') navigatePhotos('next');
      if (e.key === 'Escape') setSelectedPhoto(null);
      if (e.key === 'Enter' && e.ctrlKey) {
        handleAddComment();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPhoto, currentIndex, newComment, commentUser]);

  return (
    <div className="photo-gallery-container">
      <motion.div 
        className="photos-grid"
        layout
      >
        {photos.map((photo, index) => (
          <motion.div
            key={photo.id}
            className="photo-card"
            layout
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ scale: 1.03, zIndex: 1 }}
            onClick={() => handlePhotoClick(photo, index)}
          >
            <img 
              src={photo.url} 
              alt={photo.title} 
              loading="lazy"
            />
            <div className="photo-overlay">
              <motion.button 
                className={`like-btn ${photo.favorite ? 'liked' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  if (onFavoriteToggle) onFavoriteToggle(photo.id);
                }}
                whileTap={{ scale: 0.8 }}
              >
                <FaHeart />
              </motion.button>
              <span className="photo-date">{photo.date}</span>
              {comments[photo.id]?.length > 0 && (
                <span className="comment-count">
                  <FaComment /> {comments[photo.id].length}
                </span>
              )}
            </div>
            <div className="photo-title-overlay">
              <h4>{photo.title}</h4>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
                aria-label="Close modal"
              >
                <FaTimes />
              </button>
              
              <div className="modal-image-container">
                <button 
                  className="modal-nav prev"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhotos('prev');
                  }}
                >
                  <FaChevronLeft />
                </button>
                
                <img 
                  src={selectedPhoto.url} 
                  alt={selectedPhoto.title} 
                  className="modal-image"
                />
                
                <button 
                  className="modal-nav next"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigatePhotos('next');
                  }}
                >
                  <FaChevronRight />
                </button>
              </div>
              
              <div className="modal-details">
                <div className="modal-header">
                  <h3>{selectedPhoto.title}</h3>
                  <div className="photo-meta">
                    <span className="photo-date">{selectedPhoto.date}</span>
                  </div>
                </div>
                
                <p className="photo-description">{selectedPhoto.description}</p>
                
                <div className="modal-actions">
                  <motion.button 
                    className={`like-btn ${selectedPhoto.favorite ? 'liked' : ''}`}
                    onClick={() => {
                      if (onFavoriteToggle) onFavoriteToggle(selectedPhoto.id);
                      setSelectedPhoto({
                        ...selectedPhoto,
                        favorite: !selectedPhoto.favorite
                      });
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <FaHeart /> {selectedPhoto.favorite ? 'Curtido' : 'Curtir'}
                  </motion.button>
                </div>

                {/* Seção de Comentários */}
                <div className="comments-section">
                  <h4>Comentários ({comments[selectedPhoto.id]?.length || 0})</h4>
                  
                  <div className="comments-list">
                    {comments[selectedPhoto.id]?.length > 0 ? (
                      comments[selectedPhoto.id].map(comment => (
                        <div key={comment.id} className="comment-item">
                          <div className="comment-header">
                            <FaUser className="user-icon" />
                            <span className="comment-user">{comment.user}</span>
                            <span className="comment-date">{comment.date}</span>
                          </div>
                          <p className="comment-text">{comment.text}</p>
                        </div>
                      ))
                    ) : (
                      <p className="no-comments">Nenhum comentário ainda. Seja o primeiro a comentar!</p>
                    )}
                  </div>

                  <div className="add-comment">
                    <div className="comment-input-group">
                      <input
                        type="text"
                        placeholder="Seu nome"
                        value={commentUser}
                        onChange={(e) => setCommentUser(e.target.value)}
                        className="comment-user-input"
                      />
                      <textarea
                        placeholder="Adicione um comentário..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        className="comment-text-input"
                        rows="3"
                      />
                    </div>
                    <motion.button
                      className="submit-comment-btn"
                      onClick={handleAddComment}
                      disabled={!newComment.trim() || !commentUser.trim()}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <FaPaperPlane /> Enviar
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PhotoGallery;