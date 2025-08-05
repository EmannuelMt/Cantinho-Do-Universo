import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause, FaHeart } from 'react-icons/fa';
import './Playlist.css';

const Playlist = () => {
  const [songs, setSongs] = useState([
    {
      id: 1,
      title: "Música Especial",
      artist: "Artista Favorito",
      cover: "/assets/images/music-cover.jpg",
      url: "https://open.spotify.com/track/...",
      meaning: "Essa foi a primeira música que dançamos juntos"
    }
  ]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = (song) => {
    if (currentSong && currentSong.id === song.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentSong(song);
      setIsPlaying(true);
    }
  };

  return (
    <div className="playlist-page">
      <h1>Nossa Trilha Sonora</h1>
      
      <div className="songs-grid">
        {songs.map((song) => (
          <motion.div 
            key={song.id}
            className="song-card"
            whileHover={{ scale: 1.03 }}
          >
            <div className="song-cover">
              <img src={song.cover} alt={song.title} />
              <button 
                className="play-btn"
                onClick={() => togglePlay(song)}
              >
                {currentSong?.id === song.id && isPlaying ? <FaPause /> : <FaPlay />}
              </button>
            </div>
            
            <div className="song-info">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
              <button className="like-btn">
                <FaHeart />
              </button>
            </div>
            
            <div className="song-meaning">
              <p>{song.meaning}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {currentSong && (
        <div className="music-player">
          <iframe
            src={`${currentSong.url}?autoplay=${isPlaying ? 1 : 0}`}
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          ></iframe>
        </div>
      )}
    </div>
  );
};

export default Playlist;