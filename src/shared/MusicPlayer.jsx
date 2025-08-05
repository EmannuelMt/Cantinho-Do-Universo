import { useState, useRef, useEffect } from 'react';
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from 'react-icons/fa';
import './MusicPlayer.css';

const MusicPlayer = ({ songs }) => {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const currentSong = songs[currentSongIndex];

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying, currentSongIndex]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prev) => (prev + 1) % songs.length);
    setProgress(0);
  };

  const handlePrev = () => {
    setCurrentSongIndex((prev) => (prev - 1 + songs.length) % songs.length);
    setProgress(0);
  };

  const handleProgress = (e) => {
    const duration = e.target.duration;
    const currentTime = e.target.currentTime;
    setProgress((currentTime / duration) * 100);
  };

  return (
    <div className="music-player">
      <audio
        ref={audioRef}
        src={currentSong.url}
        onTimeUpdate={handleProgress}
        onEnded={handleNext}
      />
      
      <div className="song-info">
        <img src={currentSong.cover} alt={currentSong.title} />
        <div>
          <h3>{currentSong.title}</h3>
          <p>{currentSong.artist}</p>
        </div>
      </div>

      <div className="player-controls">
        <button onClick={handlePrev}>
          <FaStepBackward />
        </button>
        
        <button onClick={handlePlayPause} className="play-btn">
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        
        <button onClick={handleNext}>
          <FaStepForward />
        </button>
      </div>

      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

export default MusicPlayer;