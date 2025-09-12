import { useState, useRef, useEffect } from 'react'
import { FaPlus, FaHeart, FaImages, FaLock, FaStar, FaShare } from 'react-icons/fa'
import { IoDiamondOutline } from 'react-icons/io5'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import './Albums.css'

// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger)

const Albums = () => {
  const [hoveredAlbum, setHoveredAlbum] = useState(null)
  const sectionRef = useRef(null)
  const cardsRef = useRef([])

  // Álbuns de exemplo com dados enriquecidos
  const albums = [
    { 
      id: 1, 
      title: "Aniversário Inesquecível", 
      count: 24, 
      cover: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
      date: "15 Nov 2023",
      private: false,
      featured: true
    },
    { 
      id: 2, 
      title: "Férias no Paraíso", 
      count: 18, 
      cover: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2073&q=80",
      date: "Jul 2023",
      private: false,
      featured: false
    },
    { 
      id: 3, 
      title: "Momentos Especiais", 
      count: 32, 
      cover: "https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      date: "Vários",
      private: true,
      featured: true
    },
    { 
      id: 4, 
      title: "Jantar à Luz de Velas", 
      count: 15, 
      cover: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      date: "20 Out 2023",
      private: false,
      featured: false
    },
    { 
      id: 5, 
      title: "Passeios Românticos", 
      count: 27, 
      cover: "https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      date: "Set 2023",
      private: false,
      featured: true
    },
    { 
      id: 6, 
      title: "Nosso Encontro", 
      count: 42, 
      cover: "https://images.unsplash.com/photo-1516487106395-f2d269d6a21c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
      date: "Jan 2023",
      private: true,
      featured: false
    }
  ]

  useEffect(() => {
    // Animação de entrada para os cards
    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, 
          { opacity: 0, y: 60, rotationY: 15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 0.8,
            delay: index * 0.1,
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        )
      }
    })

    // Animação para o título
    gsap.fromTo('.section-title', 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
          trigger: '.section-title',
          start: "top 80%",
          toggleActions: "play none none reverse"
        }
      }
    )
  }, [])

  return (
    <div className="albums" ref={sectionRef}>
      {/* Elementos de fundo decorativos */}
      <div className="background-elements">
        <div className="bg-shape shape-1"></div>
        <div className="bg-shape shape-2"></div>
        <div className="bg-shape shape-3"></div>
      </div>

      <div className="container">
        <div className="section-header">
          <h1 className="section-title">
            <span className="title-line">Nossa Coleção</span>
            <span className="title-line">de Momentos</span>
          </h1>
          <p className="section-subtitle">Cada álbum é um tesouro precioso de nossas memórias compartilhadas</p>
        </div>
        
        <div className="albums-grid">
          {albums.map((album, index) => (
            <div 
              key={album.id} 
              className={`album-card ${hoveredAlbum === album.id ? 'hovered' : ''} ${album.featured ? 'featured' : ''}`}
              onMouseEnter={() => setHoveredAlbum(album.id)}
              onMouseLeave={() => setHoveredAlbum(null)}
              ref={el => cardsRef.current[index] = el}
            >
              <div className="card-inner">
                <div className="album-cover">
                  <img src={album.cover} alt={album.title} />
                  <div className="cover-overlay"></div>
                  <div className="cover-shine"></div>
                  
                  {/* Badges */}
                  {album.featured && (
                    <div className="album-badge featured">
                      <FaStar />
                      <span>Destaque</span>
                    </div>
                  )}
                  
                  {album.private && (
                    <div className="album-badge private">
                      <FaLock />
                      <span>Privado</span>
                    </div>
                  )}
                  
                  <div className="album-actions">
                    <button className="action-btn">
                      <FaShare />
                    </button>
                    <button className="action-btn">
                      <FaHeart />
                    </button>
                  </div>
                </div>
                
                <div className="album-info">
                  <h3 className="album-title">{album.title}</h3>
                  <div className="album-meta">
                    <span className="photo-count">
                      <FaImages />
                      {album.count} fotos
                    </span>
                    <span className="album-date">{album.date}</span>
                  </div>
                </div>
                
                <div className="album-hover-effect"></div>
                <div className="card-corner-tl"></div>
                <div className="card-corner-tr"></div>
                <div className="card-corner-bl"></div>
                <div className="card-corner-br"></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="create-album-section">
          <div className="create-album-card">
            <div className="create-icon">
              <FaPlus />
            </div>
            <h3>Criar Novo Álbum</h3>
            <p>Preserve novos momentos especiais</p>
            <button className="create-btn">
              <span>Criar Álbum</span>
              <IoDiamondOutline />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Albums