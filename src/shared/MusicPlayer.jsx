import { useState, useRef, useEffect } from 'react';
import { 
  FaPlay, 
  FaPause, 
  FaStepForward, 
  FaStepBackward, 
  FaVolumeUp,
  FaVolumeMute,
  FaRandom,
  FaRedo,
  FaHeart,
  FaRegHeart,
  FaExpand,
  FaCompress,
  FaList,
  FaMusic
} from 'react-icons/fa';
import { 
  IoMdShuffle,
  IoMdRepeat,
  IoIosSkipForward,
  IoIosSkipBackward
} from 'react-icons/io';
import { 
  BsFillVolumeUpFill,
  BsFillVolumeMuteFill,
  BsMusicNoteList,
  BsHeartFill,
  BsHeart
} from 'react-icons/bs';
import { 
  MdGraphicEq,
  MdOutlineQueueMusic
} from 'react-icons/md';
import { motion, AnimatePresence } from 'framer-motion';
import './MusicPlayer.css';

const MusicPlayer = ({ songs, onToggleLike, likedSongs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [isMuted, setIsMuted] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [isRepeatOn, setIsRepeatOn] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSongListVisible, setIsSongListVisible] = useState(false);
  const [isHoveringProgress, setIsHoveringProgress] = useState(false);
  
  const audioRef = useRef(null);
  const progressBarRef = useRef(null);
  const volumeSliderRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  // Format time from seconds to MM:SS
  const formatTime = (seconds) => {
    if (isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle play/pause
  useEffect(() => {
    const playAudio = async () => {
      if (isPlaying) {
        try {
          await audioRef.current.play();
        } catch (error) {
          console.error("Playback failed:", error);
          setIsPlaying(false);
        }
      } else {
        audioRef.current.pause();
      }
    };
    
    playAudio();
  }, [isPlaying, currentSongIndex]);

  // Update time display and progress
  useEffect(() => {
    const audio = audioRef.current;
    
    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      setProgress((audio.currentTime / audio.duration) * 100);
    };
    
    const updateDuration = () => {
      setDuration(audio.duration);
    };
    
    const handleEnd = () => {
      handleSongEnd();
    };
    
    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnd);
    
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnd);
    };
  }, [currentSongIndex]);

  // Handle volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        handlePlayPause();
      } else if (e.code === 'ArrowRight') {
        handleNext();
      } else if (e.code === 'ArrowLeft') {
        handlePrev();
      } else if (e.code === 'ArrowUp') {
        setVolume(prev => Math.min(prev + 10, 100));
      } else if (e.code === 'ArrowDown') {
        setVolume(prev => Math.max(prev - 10, 0));
      } else if (e.code === 'KeyM') {
        toggleMute();
      } else if (e.code === 'KeyL') {
        toggleSongList();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    let nextIndex;
    if (isShuffleOn) {
      do {
        nextIndex = Math.floor(Math.random() * songs.length);
      } while (nextIndex === currentSongIndex && songs.length > 1);
    } else {
      nextIndex = (currentSongIndex + 1) % songs.length;
    }
    
    setCurrentSongIndex(nextIndex);
    setProgress(0);
    if (!isPlaying) setIsPlaying(true);
  };

  const handlePrev = () => {
    if (currentTime > 3) {
      // If song is more than 3 seconds in, restart it
      audioRef.current.currentTime = 0;
      setProgress(0);
    } else {
      // Otherwise go to previous song
      setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
      setProgress(0);
    }
    if (!isPlaying) setIsPlaying(true);
  };

  const handleSongEnd = () => {
    if (isRepeatOn) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    } else {
      handleNext();
    }
  };

  const handleProgressClick = (e) => {
    const progressBar = progressBarRef.current;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = e.clientX - rect.left;
    const progressBarWidth = progressBar.clientWidth;
    const percentageClicked = (clickPosition / progressBarWidth) * 100;
    const newTime = (percentageClicked / 100) * audioRef.current.duration;
    
    audioRef.current.currentTime = newTime;
    setProgress(percentageClicked);
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseInt(e.target.value);
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (!isMuted) {
      // Store the previous volume before muting
      localStorage.setItem('previousVolume', volume);
      setVolume(0);
    } else {
      // Restore the previous volume
      const prevVolume = parseInt(localStorage.getItem('previousVolume')) || 80;
      setVolume(prevVolume);
    }
  };

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn);
  };

  const toggleRepeat = () => {
    setIsRepeatOn(!isRepeatOn);
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const toggleSongList = () => {
    setIsSongListVisible(!isSongListVisible);
  };

  const handleSongSelect = (index) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    setIsSongListVisible(false);
  };

  const handleLike = (e) => {
    e.stopPropagation();
    if (onToggleLike) {
      onToggleLike(currentSong.id);
    }
  };

  return (
    <motion.div 
      className={`music-player ${isExpanded ? 'expanded' : ''}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <audio
        ref={audioRef}
        src={currentSong.url}
        preload="metadata"
        onError={(e) => console.error("Audio loading error", e)}
      />
      
      <div className="player-main">
        <motion.div 
          className="song-info" 
          onClick={toggleExpand}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div 
            className="album-cover-container"
            animate={{ rotate: isPlaying ? 360 : 0 }}
            transition={{ 
              rotate: { 
                duration: 15, 
                repeat: Infinity, 
                ease: "linear" 
              } 
            }}
          >
            <img 
              src={currentSong.cover} 
              alt={currentSong.title} 
              className="album-cover"
            />
            <motion.div 
              className="album-overlay"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {isPlaying ? (
                <div className="equalizer">
                  <motion.div 
                    className="equalizer-bar"
                    animate={{ height: ["30%", "80%", "30%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                  />
                  <motion.div 
                    className="equalizer-bar"
                    animate={{ height: ["60%", "90%", "60%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                  />
                  <motion.div 
                    className="equalizer-bar"
                    animate={{ height: ["40%", "70%", "40%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                  />
                  <motion.div 
                    className="equalizer-bar"
                    animate={{ height: ["70%", "95%", "70%"] }}
                    transition={{ duration: 0.8, repeat: Infinity, delay: 0.6 }}
                  />
                </div>
              ) : (
                <FaPlay className="play-overlay" />
              )}
            </motion.div>
          </motion.div>
          
          <div className="song-details">
            <motion.h3 
              className="song-title"
              key={currentSong.title}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {currentSong.title}
            </motion.h3>
            <p className="song-artist">{currentSong.artist}</p>
            <div className="time-display">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>
          
          <motion.button 
            className={`like-btn ${likedSongs.has(currentSong.id) ? 'liked' : ''}`}
            onClick={handleLike}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label={likedSongs.has(currentSong.id) ? "Desfavoritar" : "Favoritar"}
          >
            {likedSongs.has(currentSong.id) ? <BsHeartFill /> : <BsHeart />}
          </motion.button>
        </motion.div>

        <div className="progress-container">
          <div 
            className="progress-bar-bg" 
            ref={progressBarRef} 
            onClick={handleProgressClick}
            onMouseEnter={() => setIsHoveringProgress(true)}
            onMouseLeave={() => setIsHoveringProgress(false)}
          >
            <motion.div 
              className="progress-bar"
              style={{ width: `${progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.1 }}
            >
              <motion.div 
                className="progress-handle"
                animate={{ scale: isHoveringProgress ? 1 : 0 }}
                transition={{ duration: 0.2 }}
              />
            </motion.div>
          </div>
        </div>

        <div className="player-controls">
          <motion.button 
            onClick={toggleShuffle}
            className={`control-btn ${isShuffleOn ? 'active' : ''}`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Embaralhar"
          >
            <IoMdShuffle />
          </motion.button>
          
          <motion.button 
            onClick={handlePrev} 
            className="control-btn" 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Música anterior"
          >
            <IoIosSkipBackward />
          </motion.button>
          
          <motion.button 
            onClick={handlePlayPause} 
            className="play-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isPlaying ? "Pausar" : "Reproduzir"}
          >
            {isPlaying ? <FaPause /> : <FaPlay />}
          </motion.button>
          
          <motion.button 
            onClick={handleNext} 
            className="control-btn" 
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Próxima música"
          >
            <IoIosSkipForward />
          </motion.button>
          
          <motion.button 
            onClick={toggleRepeat}
            className={`control-btn ${isRepeatOn ? 'active' : ''}`}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Repetir"
          >
            <IoMdRepeat />
          </motion.button>
        </div>

        <div className="volume-controls">
          <motion.button 
            onClick={toggleMute} 
            className="volume-btn"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isMuted ? "Ativar som" : "Desativar som"}
          >
            {isMuted || volume === 0 ? <BsFillVolumeMuteFill /> : <BsFillVolumeUpFill />}
          </motion.button>
          <div className="volume-slider-container">
            <input
              ref={volumeSliderRef}
              type="range"
              min="0"
              max="100"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Controle de volume"
            />
            <motion.div 
              className="volume-level" 
              style={{ width: `${isMuted ? 0 : volume}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${isMuted ? 0 : volume}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
        </div>

        <motion.button 
          onClick={toggleSongList}
          className="song-list-toggle"
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isSongListVisible ? "Ocultar lista" : "Mostrar lista"}
        >
          <MdOutlineQueueMusic />
          {isSongListVisible ? 'Ocultar' : 'Lista'}
        </motion.button>

        <motion.button 
          onClick={toggleExpand}
          className="expand-btn"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          aria-label={isExpanded ? "Recolher" : "Expandir"}
        >
          {isExpanded ? <FaCompress /> : <FaExpand />}
        </motion.button>
      </div>

      <AnimatePresence>
        {isSongListVisible && (
          <motion.div 
            className="song-list-container"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="song-list">
              <div className="song-list-header">
                <h3>
                  <BsMusicNoteList /> Playlist
                </h3>
                <span>{songs.length} músicas</span>
              </div>
              <ul>
                {songs.map((song, index) => (
                  <motion.li 
                    key={index} 
                    className={index === currentSongIndex ? 'active' : ''}
                    onClick={() => handleSongSelect(index)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ x: 5, backgroundColor: "rgba(138, 79, 255, 0.05)" }}
                  >
                    <div className="song-list-img">
                      <img src={song.cover} alt={song.title} />
                      {index === currentSongIndex && isPlaying && (
                        <div className="playing-indicator">
                          <motion.div 
                            className="playing-bar"
                            animate={{ height: ["30%", "80%", "30%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0 }}
                          />
                          <motion.div 
                            className="playing-bar"
                            animate={{ height: ["60%", "90%", "60%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }}
                          />
                          <motion.div 
                            className="playing-bar"
                            animate={{ height: ["40%", "70%", "40%"] }}
                            transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }}
                          />
                        </div>
                      )}
                    </div>
                    <div className="song-list-info">
                      <span className="song-list-title">{song.title}</span>
                      <span className="song-list-artist">{song.artist}</span>
                    </div>
                    <div className="song-list-duration">{song.duration}</div>
                    <motion.button 
                      className={`song-list-like ${likedSongs.has(song.id) ? 'liked' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(song.id);
                      }}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={likedSongs.has(song.id) ? "Desfavoritar" : "Favoritar"}
                    >
                      {likedSongs.has(song.id) ? <BsHeartFill /> : <BsHeart />}
                    </motion.button>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default MusicPlayer;