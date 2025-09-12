import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  FaHome, 
  FaImages, 
  FaFolder, 
  FaEnvelope, 
  FaMusic, 
  FaGamepad,
  FaBars,
  FaTimes,
  FaHeart,
  FaCrown
} from 'react-icons/fa'
import { IoDiamondOutline, IoSparkles } from 'react-icons/io5'
import { GiPearlNecklace } from 'react-icons/gi'
import { gsap } from 'gsap'
import './Navbar.css'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeHover, setActiveHover] = useState(null)
  const location = useLocation()
  const navbarRef = useRef(null)
  const logoRef = useRef(null)
  const itemsRef = useRef([])

  // Efeito de scroll para mudar a aparência da navbar
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20
      setScrolled(isScrolled)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Animação de entrada da navbar
  useEffect(() => {
    gsap.fromTo(navbarRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )

    gsap.fromTo(logoRef.current, 
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 1.2, delay: 0.3, ease: "elastic.out(1.2, 0.4)" }
    )

    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(item, 
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.8, delay: 0.5 + index * 0.1, ease: "power3.out" }
        )
      }
    })
  }, [])

  // Fechar menu ao mudar de rota
  useEffect(() => {
    setIsOpen(false)
  }, [location])

  const navItems = [
    { path: '/', name: 'Home', icon: <FaHome /> },
    { path: '/fotos', name: 'Galeria', icon: <FaImages /> },
    { path: '/albuns', name: 'Coleções', icon: <FaFolder /> },
    { path: '/cartas', name: 'Manuscritos', icon: <FaEnvelope /> },
    { path: '/musicas', name: 'Sinfonia', icon: <FaMusic /> },
    { path: '/jogos', name: 'Divertimentos', icon: <FaGamepad /> }
  ]

  const handleItemHover = (index) => {
    setActiveHover(index)
    // Efeito de brilho no item
    if (itemsRef.current[index]) {
      gsap.to(itemsRef.current[index], {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  const handleItemLeave = (index) => {
    setActiveHover(null)
    if (itemsRef.current[index]) {
      gsap.to(itemsRef.current[index], {
        scale: 1,
        duration: 0.3,
        ease: "power2.out"
      })
    }
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`} ref={navbarRef}>
      {/* Elementos de fundo premium */}
      <div className="nav-background">
        <div className="nav-shine"></div>
        <div className="nav-glow"></div>
      </div>

      <div className="nav-container">
        <Link to="/" className="nav-logo" onClick={() => setIsOpen(false)} ref={logoRef}>
          <div className="logo-icon">
            <IoDiamondOutline />
            <div className="logo-sparkle"></div>
          </div>
          <span className="logo-text">
            Universo<span className="logo-accent">Amoroso</span>
          </span>
          <div className="logo-badge">Premium</div>
        </Link>
        
        <div className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navItems.map((item, index) => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
              onMouseEnter={() => handleItemHover(index)}
              onMouseLeave={() => handleItemLeave(index)}
              ref={el => itemsRef.current[index] = el}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-text">{item.name}</span>
              <span className="nav-indicator"></span>
              <span className="nav-hover-effect"></span>
              <span className="nav-sparkle">
                <IoSparkles />
              </span>
            </Link>
          ))}
        </div>
        
        <div className="nav-extra">
          <div className="nav-heart">
            <FaHeart />
            <div className="heart-pulse"></div>
          </div>
          <div className="nav-crown">
            <FaCrown />
          </div>
        </div>

        <div className={`nav-toggle ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
          <div className="toggle-glow"></div>
        </div>
      </div>

      {/* Overlay premium para mobile */}
      {isOpen && (
        <div className="nav-overlay" onClick={() => setIsOpen(false)}>
          <div className="overlay-shine"></div>
        </div>
      )}

      {/* Efeito de partículas para itens ativos */}
      {activeHover !== null && (
        <div className="nav-particle-effect" style={{
          left: itemsRef.current[activeHover]?.getBoundingClientRect().left + itemsRef.current[activeHover]?.offsetWidth / 2,
          top: itemsRef.current[activeHover]?.getBoundingClientRect().bottom
        }}></div>
      )}
    </nav>
  )
}

export default Navbar