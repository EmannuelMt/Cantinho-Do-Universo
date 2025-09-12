import { useState } from 'react'
import './Music.css'

const Music = () => {
  const [currentSong, setCurrentSong] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  
  const songs = [
    { id: 1, title: "Nossa Música", artist: "Artista Favorito", duration: "3:45" },
    { id: 2, title: "Canção do Amor", artist: "Cantor Romântico", duration: "4:20" },
    { id: 3, title: "Melodia da Paixão", artist: "Dupla Sensacional", duration: "3:15" },
    { id: 4, title: "Sinfonia dos Corações", artist: "Banda Incrível", duration: "5:10" },
  ]

  const playSong = (song) => {
    setCurrentSong(song)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  return (
    <div className="music">
      <h1 className="section-title">Nossas Músicas</h1>
      
      <div className="player">
        <h3>Player de Música</h3>
        {currentSong ? (
          <div className="now-playing">
            <h4>Tocando agora: {currentSong.title}</h4>
            <p>{currentSong.artist} - {currentSong.duration}</p>
            <div className="player-controls">
              <button className="btn" onClick={togglePlay}>
                {isPlaying ? 'Pausar' : 'Tocar'}
              </button>
            </div>
          </div>
        ) : (
          <p>Selecione uma música para tocar</p>
        )}
      </div>
      
      <div className="songs-list">
        <h3>Nossa Playlist</h3>
        {songs.map(song => (
          <div 
            key={song.id} 
            className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
            onClick={() => playSong(song)}
          >
            <div className="song-info">
              <h4>{song.title}</h4>
              <p>{song.artist} - {song.duration}</p>
            </div>
            <div className="play-icon">▶</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Music