import './Photos.css'

const Photos = () => {
  // Fotos de exemplo (em um projeto real, estas viriam de uma API ou base de dados)
  const photos = [
    { id: 1, src: "https://placehold.co/400x300/0f0c29/FFFFFF?text=Foto+1", title: "Nosso primeiro dia" },
    { id: 2, src: "https://placehold.co/400x300/0f0c29/FFFFFF?text=Foto+2", title: "Aniversário" },
    { id: 3, src: "https://placehold.co/400x300/0f0c29/FFFFFF?text=Foto+3", title: "Férias" },
    { id: 4, src: "https://placehold.co/400x300/0f0c29/FFFFFF?text=Foto+4", title: "Jantar romântico" },
    { id: 5, src: "https://placehold.co/400x300/0f0c29/FFFFFF?text=Foto+5", title: "Pôr do sol" },
    { id: 6, src: "https://placehold.co/400x300/0f0c29/FFFFFF?text=Foto+6", title: "Celebração" },
  ]

  return (
    <div className="photos">
      <h1 className="section-title">Nossas Fotos</h1>
      
      <div className="photos-grid">
        {photos.map(photo => (
          <div key={photo.id} className="photo-card">
            <img src={photo.src} alt={photo.title} />
            <div className="photo-overlay">
              <h3>{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Photos