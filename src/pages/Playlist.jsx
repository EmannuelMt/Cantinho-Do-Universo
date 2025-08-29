import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaPlay, 
  FaPause, 
  FaHeart, 
  FaMusic, 
  FaRandom, 
  FaStepBackward, 
  FaStepForward, 
  FaVolumeUp, 
  FaSearch, 
  FaTimes,
  FaRegHeart,
  FaPlus,
  FaEdit,
  FaTrash,
  FaShare,
  FaDownload
} from 'react-icons/fa';
import { 
  IoMdShuffle,
  IoMdRepeat,
  IoIosSkipForward,
  IoIosSkipBackward,
  IoIosAdd,
  IoIosRemove
} from 'react-icons/io';
import { 
  BsMusicNoteBeamed,
  BsHeartFill,
  BsHeart,
  BsCalendarDate,
  BsClock,
  BsSortDown,
  BsThreeDotsVertical,
  BsStarFill,
  BsStar
} from 'react-icons/bs';
import { 
  MdGraphicEq,
  MdOutlineQueueMusic,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdEqualizer
} from 'react-icons/md';
import { 
  RiPlayListFill, 
  RiUserVoiceFill, 
  RiPlayList2Fill,
  RiShareForwardLine
} from 'react-icons/ri';
import { 
  BiAlbum, 
  BiTime, 
  BiLike, 
  BiDislike,
  BiCloudDownload
} from 'react-icons/bi';
import { 
  TbPlaylistOff,
  TbMusicOff,
  TbFilterOff
} from 'react-icons/tb';
import { 
  HiOutlineDotsCircleHorizontal 
} from 'react-icons/hi';
import MusicPlayer from "../shared/MusicPlayer.jsx";
import './Playlist.css';

const Playlist = () => {
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Música Especial",
      artist: "Artista Favorito",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      url: "https://open.spotify.com/track/...",
      meaning: "Essa foi a primeira música que dançamos juntos. Lembro como se fosse ontem daquele momento mágico onde tudo parecia perfeito.",
      duration: "3:45",
      genre: "Pop",
      date: "2023-01-15",
      bpm: 120,
      plays: 142,
      rating: 4.5,
      mood: "Feliz",
      location: "Praia",
      addedBy: "Você"
    },
    {
      id: 2,
      title: "Nosso Amor",
      artist: "Cantor Romântico",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      url: "https://open.spotify.com/track/...",
      meaning: "A música que estava tocando no nosso primeiro beijo. Cada vez que escuto, revivo aquele momento especial.",
      duration: "4:20",
      genre: "MPB",
      date: "2023-02-28",
      bpm: 95,
      plays: 218,
      rating: 5,
      mood: "Romântico",
      location: "Restaurante",
      addedBy: "Parceiro(a)"
    },
    {
      id: 3,
      title: "Dança da Noite",
      artist: "Banda Favorita",
      cover: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      url: "https://open.spotify.com/track/...",
      meaning: "Essa sempre nos faz levantar e dançar juntos. Nossa música para celebrar a vida a dois.",
      duration: "3:15",
      genre: "Rock",
      date: "2023-03-10",
      bpm: 140,
      plays: 187,
      rating: 4,
      mood: "Animado",
      location: "Casa",
      addedBy: "Você"
    },
    {
      id: 4,
      title: "Melodia do Coração",
      artist: "Dueto Perfeito",
      cover: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      url: "https://open.spotify.com/track/...",
      meaning: "Nossa música tema em todos os momentos especiais. A trilha sonora do nosso amor.",
      duration: "3:55",
      genre: "Pop",
      date: "2023-04-22",
      bpm: 110,
      plays: 265,
      rating: 4.8,
      mood: "Nostálgico",
      location: "Viagem",
      addedBy: "Parceiro(a)"
    },
    {
      id: 5,
      title: "Caminhos Entrelaçados",
      artist: "Compositor Inspirado",
      cover: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      url: "https://open.spotify.com/track/...",
      meaning: "A música que tocava durante nossos passeios de carro sem destino. Liberdade pura.",
      duration: "4:10",
      genre: "Indie",
      date: "2023-05-15",
      bpm: 105,
      plays: 176,
      rating: 4.2,
      mood: "Livre",
      location: "Estrada",
      addedBy: "Você"
    },
    {
      id: 6,
      title: "Sinfonia do Adeus",
      artist: "Orquestra Emocional",
      cover: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1000&q=80",
      url: "https://open.spotify.com/track/...",
      meaning: "Para aqueles momentos de despedida que doem, mas sabem que o reencontro será melhor ainda.",
      duration: "5:22",
      genre: "Clássica",
      date: "2023-06-30",
      bpm: 70,
      plays: 89,
      rating: 3.8,
      mood: "Emocional",
      location: "Aeroporto",
      addedBy: "Parceiro(a)"
    }
  ]);
  
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [likedSongs, setLikedSongs] = useState(new Set());
  const [volume, setVolume] = useState(80);
  const [currentTime, setCurrentTime] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');
  const [selectedMood, setSelectedMood] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [isExpandedView, setIsExpandedView] = useState(false);
  const [isFiltersVisible, setIsFiltersVisible] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState(new Set());
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'

  // Memoized filtered and sorted songs
  const { filteredSongs, sortedSongs } = useMemo(() => {
    const filtered = songs.filter(song => {
      const matchesSearch = song.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            song.artist.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            song.meaning.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'all' || song.genre === selectedGenre;
      const matchesMood = selectedMood === 'all' || song.mood === selectedMood;
      return matchesSearch && matchesGenre && matchesMood;
    });

    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      if (sortBy === 'artist') return a.artist.localeCompare(b.artist);
      if (sortBy === 'date') return new Date(b.date) - new Date(a.date);
      if (sortBy === 'plays') return b.plays - a.plays;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'duration') {
        const aDuration = a.duration.split(':').reduce((min, sec) => (parseInt(min) * 60) + parseInt(sec));
        const bDuration = b.duration.split(':').reduce((min, sec) => (parseInt(min) * 60) + parseInt(sec));
        return bDuration - aDuration;
      }
      return 0;
    });

    return { filteredSongs: filtered, sortedSongs: sorted };
  }, [songs, searchQuery, selectedGenre, selectedMood, sortBy]);

  // Gêneros e moods únicos para os filtros
  const genres = useMemo(() => ['all', ...new Set(songs.map(song => song.genre))], [songs]);
  const moods = useMemo(() => ['all', ...new Set(songs.map(song => song.mood))], [songs]);

  const togglePlay = (song) => {
    if (currentSong && currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
      setCurrentTime(0);
      
      // Simular aumento de plays
      setSongs(prev => prev.map(s => 
        s.id === song.id ? {...s, plays: s.plays + 1} : s
      ));
    }
  };

  const toggleLike = (songId, e) => {
    e.stopPropagation();
    const newLikedSongs = new Set(likedSongs);
    if (newLikedSongs.has(songId)) {
      newLikedSongs.delete(songId);
    } else {
      newLikedSongs.add(songId);
    }
    setLikedSongs(newLikedSongs);
  };

  const toggleSelectSong = (songId, e) => {
    e.stopPropagation();
    const newSelectedSongs = new Set(selectedSongs);
    if (newSelectedSongs.has(songId)) {
      newSelectedSongs.delete(songId);
    } else {
      newSelectedSongs.add(songId);
    }
    setSelectedSongs(newSelectedSongs);
  };

  const selectAllSongs = () => {
    if (selectedSongs.size === filteredSongs.length) {
      setSelectedSongs(new Set());
    } else {
      setSelectedSongs(new Set(filteredSongs.map(song => song.id)));
    }
  };

  const playNextSong = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    let nextIndex;
    
    if (shuffle) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentIndex && songs.length > 1);
    } else {
      nextIndex = (currentIndex + 1) % songs.length;
    }
    
    setCurrentSong(songs[nextIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  const playPreviousSong = () => {
    if (!currentSong) return;
    
    const currentIndex = songs.findIndex(song => song.id === currentSong.id);
    const prevIndex = currentIndex === 0 ? songs.length - 1 : currentIndex - 1;
    
    setCurrentSong(songs[prevIndex]);
    setCurrentTime(0);
    setIsPlaying(true);
  };

  // Simula o avanço da música
  useEffect(() => {
    let interval;
    if (isPlaying && currentSong) {
      interval = setInterval(() => {
        setCurrentTime(prev => {
          const durationParts = currentSong.duration.split(':');
          const totalSeconds = parseInt(durationParts[0]) * 60 + parseInt(durationParts[1]);
          
          if (prev >= totalSeconds) {
            if (repeat) {
              setCurrentTime(0);
              return 0;
            } else {
              playNextSong();
              return 0;
            }
          }
          return prev + 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentSong, repeat]);

  // Formata o tempo em minutos:segundos
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const totalDuration = useMemo(() => songs.reduce((total, song) => {
    const [mins, secs] = song.duration.split(':').map(Number);
    return total + mins * 60 + secs;
  }, 0), [songs]);

  const formatTotalDuration = () => {
    const hours = Math.floor(totalDuration / 3600);
    const minutes = Math.floor((totalDuration % 3600) / 60);
    return `${hours}h ${minutes}m`;
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedGenre('all');
    setSelectedMood('all');
    setSortBy('date');
  };

  const renderStarRating = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <span key={index} className={index < Math.floor(rating) ? 'star filled' : 'star'}>
        {index < Math.floor(rating) ? <BsStarFill /> : <BsStar />}
      </span>
    ));
  };

  return (
    <div className="playlist-page">
      <motion.header 
        className="playlist-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="header-content">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Nossa Trilha Sonora
          </motion.h1>
          <motion.p 
            className="playlist-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            As músicas que marcaram nossa história
          </motion.p>
          <motion.div 
            className="stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <span><MdLibraryMusic /> {songs.length} músicas</span>
            <span>•</span>
            <span><BsHeartFill /> {likedSongs.size} favoritadas</span>
            <span>•</span>
            <span><RiPlayListFill /> {genres.length - 1} gêneros</span>
            <span>•</span>
            <span><BiTime /> {formatTotalDuration()}</span>
          </motion.div>
        </div>
        
        <div className="header-actions">
          <motion.button 
            className="header-btn"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaShare /> Compartilhar
          </motion.button>
          <motion.button 
            className="header-btn"
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <BiCloudDownload /> Exportar
          </motion.button>
          <motion.button 
            className={`header-btn ${isEditing ? 'active' : ''}`}
            onClick={() => setIsEditing(!isEditing)}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaEdit /> {isEditing ? 'Concluir' : 'Editar'}
          </motion.button>
        </div>
        
        <div className="header-background">
          <motion.div 
            className="bg-element bg-element-1"
            animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 15, repeat: Infinity }}
          ></motion.div>
          <motion.div 
            className="bg-element bg-element-2"
            animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
            transition={{ duration: 12, repeat: Infinity, delay: 1 }}
          ></motion.div>
          <motion.div 
            className="bg-element bg-element-3"
            animate={{ y: [0, -20, 0], rotate: [0, 7, 0] }}
            transition={{ duration: 18, repeat: Infinity, delay: 2 }}
          ></motion.div>
        </div>
      </motion.header>
      
      <motion.div 
        className="controls-row"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
      >
        <div className="search-box">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Buscar músicas, artistas, significados..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <motion.button 
              className="clear-search"
              onClick={() => setSearchQuery('')}
              aria-label="Limpar busca"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaTimes />
            </motion.button>
          )}
        </div>
        
        <div className="view-toggle-group">
          <motion.button 
            className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
            onClick={() => setViewMode('grid')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <RiPlayList2Fill /> Grade
          </motion.button>
          <motion.button 
            className={`view-toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
            onClick={() => setViewMode('list')}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdOutlineQueueMusic /> Lista
          </motion.button>
        </div>
        
        <motion.button 
          className="filters-toggle"
          onClick={() => setIsFiltersVisible(!isFiltersVisible)}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <BsSortDown /> Filtros {isFiltersVisible ? <IoIosRemove /> : <IoIosAdd />}
        </motion.button>
      </motion.div>
      
      <AnimatePresence>
        {isFiltersVisible && (
          <motion.div 
            className="filters-expanded"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="filters-grid">
              <div className="filter-group">
                <label><RiPlayListFill /> Gênero</label>
                <select 
                  value={selectedGenre} 
                  onChange={(e) => setSelectedGenre(e.target.value)}
                  className="genre-filter"
                >
                  {genres.map(genre => (
                    <option key={genre} value={genre}>
                      {genre === 'all' ? 'Todos os gêneros' : genre}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label><MdGraphicEq /> Mood</label>
                <select 
                  value={selectedMood} 
                  onChange={(e) => setSelectedMood(e.target.value)}
                  className="mood-filter"
                >
                  {moods.map(mood => (
                    <option key={mood} value={mood}>
                      {mood === 'all' ? 'Todos os moods' : mood}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="filter-group">
                <label><BsSortDown /> Ordenar por</label>
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-filter"
                >
                  <option value="date"><BsCalendarDate /> Data</option>
                  <option value="title">Título</option>
                  <option value="artist"><RiUserVoiceFill /> Artista</option>
                  <option value="plays">Mais reproduzidas</option>
                  <option value="rating">Melhor avaliadas</option>
                  <option value="duration">Duração</option>
                </select>
              </div>
              
              <motion.button 
                className="clear-filters-btn"
                onClick={clearFilters}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
              >
                <TbFilterOff /> Limpar Filtros
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {isEditing && (
        <motion.div 
          className="editing-toolbar"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="editing-info">
            <span>{selectedSongs.size} {selectedSongs.size === 1 ? 'música selecionada' : 'músicas selecionadas'}</span>
          </div>
          <div className="editing-actions">
            <motion.button 
              className="edit-btn"
              onClick={selectAllSongs}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              {selectedSongs.size === filteredSongs.length ? 'Desselecionar' : 'Selecionar'} Todas
            </motion.button>
            <motion.button 
              className="edit-btn danger"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaTrash /> Remover
            </motion.button>
            <motion.button 
              className="edit-btn"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <FaDownload /> Exportar
            </motion.button>
          </div>
        </motion.div>
      )}

      <div className={`songs-container ${viewMode} ${isExpandedView ? 'expanded' : ''}`}>
        <AnimatePresence>
          {sortedSongs.map((song, index) => (
            <motion.div 
              key={song.id}
              className={`song-card ${currentSong?.id === song.id ? 'playing' : ''} ${selectedSongs.has(song.id) ? 'selected' : ''}`}
              whileHover={{ y: viewMode === 'grid' ? -8 : -2, scale: viewMode === 'grid' ? 1.02 : 1.01 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              layout
            >
              {isEditing && (
                <motion.div 
                  className="selection-checkbox"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  <input
                    type="checkbox"
                    checked={selectedSongs.has(song.id)}
                    onChange={(e) => toggleSelectSong(song.id, e)}
                  />
                </motion.div>
              )}
              
              <div className="song-cover-container">
                <div className="song-cover">
                  {song.cover ? (
                    <img src={song.cover} alt={song.title} />
                  ) : (
                    <div className="cover-placeholder">
                      <FaMusic />
                    </div>
                  )}
                  <motion.button 
                    className="play-btn"
                    onClick={() => togglePlay(song)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label={currentSong?.id === song.id && isPlaying ? "Pausar" : "Reproduzir"}
                  >
                    {currentSong?.id === song.id && isPlaying ? (
                      <motion.div
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 0.5, repeat: Infinity }}
                      >
                        <FaPause />
                      </motion.div>
                    ) : (
                      <FaPlay />
                    )}
                  </motion.button>
                  <div className="song-overlay">
                    <span className="song-date">
                      <BsCalendarDate /> {new Date(song.date).toLocaleDateString('pt-BR')}
                    </span>
                    <span className="song-plays">
                      <BsMusicNoteBeamed /> {song.plays}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="song-info">
                <h3>{song.title}</h3>
                <p className="artist">{song.artist}</p>
                
                <div className="song-meta">
                  <span className="duration"><BsClock /> {song.duration}</span>
                  <span className="genre-tag">{song.genre}</span>
                  <span className="mood-tag">{song.mood}</span>
                  {song.bpm && <span className="bpm-tag">{song.bpm} BPM</span>}
                </div>
                
                <div className="song-rating">
                  {renderStarRating(song.rating)}
                  <span className="rating-value">({song.rating})</span>
                </div>
                
                <div className="song-details">
                  <span className="song-location">📍 {song.location}</span>
                  <span className="song-added">Adicionado por: {song.addedBy}</span>
                </div>
              </div>
              
              <div className="song-meaning">
                <p>{song.meaning}</p>
              </div>
              
              <div className="song-actions">
                <motion.button 
                  className={`like-btn ${likedSongs.has(song.id) ? 'liked' : ''}`}
                  onClick={(e) => toggleLike(song.id, e)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  aria-label={likedSongs.has(song.id) ? "Desfavoritar" : "Favoritar"}
                >
                  {likedSongs.has(song.id) ? <BsHeartFill /> : <BsHeart />}
                </motion.button>
                
                <motion.button 
                  className="action-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <HiOutlineDotsCircleHorizontal />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {sortedSongs.length === 0 && (
          <motion.div 
            className="playlist-empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <motion.div 
              className="empty-icon"
              animate={{ y: [0, -10, 0], rotate: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <TbMusicOff />
            </motion.div>
            <h2>Nenhuma música encontrada</h2>
            <p>Tente ajustar sua busca ou filtro para ver mais resultados.</p>
            <motion.button 
              className="retry-btn"
              onClick={clearFilters}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Limpar Filtros
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {currentSong && (
          <motion.div 
            className="music-player-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <div className="now-playing">
              <div className="now-playing-info">
                <motion.div 
                  className="current-cover"
                  animate={{ rotate: isPlaying ? 360 : 0 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <img src={currentSong.cover} alt={currentSong.title} />
                </motion.div>
                <div className="track-info">
                  <h4>{currentSong.title}</h4>
                  <p>{currentSong.artist}</p>
                </div>
              </div>
              
              <div className="player-controls">
                <motion.button 
                  onClick={() => setShuffle(!shuffle)}
                  className={`control-btn ${shuffle ? 'active' : ''}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Embaralhar"
                >
                  <IoMdShuffle />
                </motion.button>
                
                <motion.button 
                  onClick={playPreviousSong}
                  className="control-btn"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Música anterior"
                >
                  <IoIosSkipBackward />
                </motion.button>
                
                <motion.button 
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="play-pause-btn"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={isPlaying ? "Pausar" : "Reproduzir"}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </motion.button>
                
                <motion.button 
                  onClick={playNextSong}
                  className="control-btn"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Próxima música"
                >
                  <IoIosSkipForward />
                </motion.button>
                
                <motion.button 
                  onClick={() => setRepeat(!repeat)}
                  className={`control-btn ${repeat ? 'active' : ''}`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label="Repetir"
                >
                  <IoMdRepeat />
                </motion.button>
              </div>
              
              <div className="progress-container">
                <span className="time-current">{formatTime(currentTime)}</span>
                <div className="progress-bar">
                  <motion.div 
                    className="progress" 
                    initial={{ width: 0 }}
                    animate={{ width: `${(currentTime / (parseInt(currentSong.duration.split(':')[0]) * 60 + parseInt(currentSong.duration.split(':')[1]))) * 100}%` }}
                    transition={{ duration: 0.1 }}
                  ></motion.div>
                </div>
                <span className="time-total">{currentSong.duration}</span>
              </div>
              
              <div className="volume-control">
                <FaVolumeUp />
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={volume} 
                  onChange={(e) => setVolume(parseInt(e.target.value))}
                  className="volume-slider"
                />
                <span className="volume-value">{volume}%</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Playlist;