import { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  FaHeart, 
  FaImages, 
  FaFolder, 
  FaEnvelope, 
  FaMusic, 
  FaGamepad,
  FaQuoteLeft,
  FaArrowDown,
  FaChevronRight,
  FaRegGem,
  FaCrown
} from 'react-icons/fa';
import { IoDiamondOutline, IoSparkles } from 'react-icons/io5';
import { GiHearts, GiPearlNecklace } from 'react-icons/gi';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

// Registrar plugins do GSAP
gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  const [days, setDays] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const bannerRef = useRef(null);
  const sectionRefs = useRef([]);
  const titleRefs = useRef([]);
  const canvasRef = useRef(null);
  const magneticRefs = useRef([]);
  
  useEffect(() => {
    // Simulação de contador de dias desde o início do relacionamento
    const startDate = new Date('2023-01-01');
    const today = new Date();
    const diffTime = Math.abs(today - startDate);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    setDays(diffDays);
    
    // Inicializar animações
    initAnimations();
    initParticles();
    initMagneticEffects();
    setIsVisible(true);

    return () => {
      if (canvasRef.current) {
        window.cancelAnimationFrame(animationFrame);
      }
    };
  }, []);

  let particles = [];
  let animationFrame;

  const initParticles = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width = window.innerWidth;
    const height = canvas.height = window.innerHeight;
    
    // Criar partículas de luxo
    const particleCount = 80;
    for (let i = 0; i < particleCount; i++) {
      const isGold = Math.random() > 0.7;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 4 + 1,
        color: isGold ? `hsl(45, 80%, 60%)` : `hsl(${Math.random() * 20 + 320}, 70%, 65%)`,
        speed: Math.random() * 3 + 0.5,
        angle: Math.random() * Math.PI * 2,
        opacity: Math.random() * 0.6 + 0.4,
        isGold: isGold
      });
    }
    
    // Animação das partículas
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Fundo sutil
      ctx.fillStyle = 'rgba(250, 247, 252, 0.01)';
      ctx.fillRect(0, 0, width, height);
      
      particles.forEach(particle => {
        // Movimento suave e orgânico
        particle.angle += Math.random() * 0.05 - 0.025;
        particle.x += Math.cos(particle.angle) * particle.speed;
        particle.y += Math.sin(particle.angle) * particle.speed;
        
        // Rebater nas bordas suavemente
        if (particle.x < 0 || particle.x > width) particle.angle = Math.PI - particle.angle;
        if (particle.y < 0 || particle.y > height) particle.angle = -particle.angle;
        
        // Desenhar partícula com brilho
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, particle.radius * 2
        );
        
        if (particle.isGold) {
          gradient.addColorStop(0, `hsla(45, 100%, 70%, ${particle.opacity})`);
          gradient.addColorStop(1, `hsla(45, 80%, 50%, 0)`);
        } else {
          gradient.addColorStop(0, `hsla(320, 100%, 70%, ${particle.opacity})`);
          gradient.addColorStop(1, `hsla(320, 70%, 50%, 0)`);
        }
        
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Brilho exterior para partículas douradas
        if (particle.isGold) {
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius * 1.5, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(45, 100%, 70%, ${particle.opacity * 0.2})`;
          ctx.fill();
        }
      });
      
      // Conexões entre partículas
      ctx.globalAlpha = 0.15;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 120) {
            ctx.beginPath();
            const gradient = ctx.createLinearGradient(
              particles[i].x, particles[i].y,
              particles[j].x, particles[j].y
            );
            
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.8;
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      
      animationFrame = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Redimensionar canvas
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

  const initMagneticEffects = () => {
    magneticRefs.current.forEach((el, index) => {
      if (!el) return;
      
      el.addEventListener('mousemove', (e) => {
        const rect = el.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const moveX = (x - centerX) * 0.2;
        const moveY = (y - centerY) * 0.2;
        
        gsap.to(el, {
          x: moveX,
          y: moveY,
          duration: 0.8,
          ease: "power2.out"
        });
      });
      
      el.addEventListener('mouseleave', () => {
        gsap.to(el, {
          x: 0,
          y: 0,
          duration: 1.2,
          ease: "elastic.out(1.2, 0.4)"
        });
      });
    });
  };
  
  const initAnimations = () => {
    // Animação para o título com efeito de revelação
    titleRefs.current.forEach((line, index) => {
      if (line) {
        const words = line.querySelectorAll('.word');
        gsap.fromTo(words, 
          { opacity: 0, y: 60, rotationX: 90 },
          {
            opacity: 1,
            y: 0,
            rotationX: 0,
            duration: 1.5,
            stagger: 0.15,
            ease: "power3.out",
            delay: index * 0.3 + 0.5
          }
        );
      }
    });
    
    // Animação para elementos de quote e counter
    gsap.fromTo('.quote, .days-counter', 
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1.2,
        stagger: 0.4,
        delay: 1.8,
        ease: "power2.out"
      }
    );
    
    // Animação para as seções com efeito parallax
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        gsap.fromTo(section, 
          { opacity: 0, y: 100, rotationY: 15 },
          {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1.2,
            delay: index * 0.2,
            scrollTrigger: {
              trigger: section,
              start: "top 85%",
              toggleActions: "play none none reverse"
            }
          }
        );

        // Efeito parallax nas seções
        gsap.to(section, {
          y: -30,
          scrollTrigger: {
            trigger: section,
            start: "top bottom",
            end: "bottom top",
            scrub: true
          }
        });
      }
    });

    // Animação para elementos flutuantes
    gsap.to('.floating-gem', {
      y: 30,
      rotation: 360,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 5
    });
  };
  
  // Dados das seções para mapeamento
  const sections = [
    {
      id: 'fotos',
      title: 'Galeria Real',
      description: 'Nossas memórias mais preciosas capturadas em imagens que transcendem o tempo, cada frame uma obra-prima de nosso amor eterno.',
      icon: <FaImages className="section-icon" />,
      buttonText: 'Explorar Galeria',
      color: '#B83D82',
      gradient: 'linear-gradient(135deg, #B83D82 0%, #8A2B62 100%)'
    },
    {
      id: 'albuns',
      title: 'Coleções Exclusivas',
      description: 'Volumes temáticos que narram os capítulos de nossa história, cada álbum uma joia rara em nosso baú de tesouros afetivos.',
      icon: <FaFolder className="section-icon" />,
      buttonText: 'Visualizar Coleções',
      color: '#8E44AD',
      gradient: 'linear-gradient(135deg, #8E44AD 0%, #6C3483 100%)'
    },
    {
      id: 'cartas',
      title: 'Manuscritos do Coração',
      description: 'Palavras entrelaçadas com emoção pura, declarações que eternizam a essência do que sentimos em cada momento compartilhado.',
      icon: <FaEnvelope className="section-icon" />,
      buttonText: 'Ler Correspondências',
      color: '#C2529E',
      gradient: 'linear-gradient(135deg, #C2529E 0%, #9C3C79 100%)'
    },
    {
      id: 'musicas',
      title: 'Sinfonia Amorosa',
      description: 'A trilha sonora de nossa jornada, melodias que encapsulam a magia de cada instante e ressoam a sintonia de nossas almas.',
      icon: <FaMusic className="section-icon" />,
      buttonText: 'Ouvir Harmonia',
      color: '#AB5FC9',
      gradient: 'linear-gradient(135deg, #AB5FC9 0%, #804399 100%)'
    },
    {
      id: 'jogos',
      title: 'Divertimentos Aristocráticos',
      description: 'Experiências lúdicas criadas para celebrar nossa cumplicidade, cada jogo uma demonstração de nossa conexão única.',
      icon: <FaGamepad className="section-icon" />,
      buttonText: 'Iniciar Diversão',
      color: '#9370DB',
      gradient: 'linear-gradient(135deg, #9370DB 0%, #6A5ACD 100%)'
    }
  ];
  
  return (
    <div className={`home ${isVisible ? 'visible' : ''}`}>
      {/* Canvas para partículas de luxo */}
      <canvas 
        ref={canvasRef} 
        className="luxury-particles-canvas"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          pointerEvents: 'none'
        }}
      />
      
      {/* Efeito de brilho global */}
      <div className="global-shine"></div>
      
      {/* Banner Principal */}
      <header className="banner" ref={bannerRef}>
        <div className="banner-background">
          <div className="luxury-shape shape-1"></div>
          <div className="luxury-shape shape-2"></div>
          <div className="luxury-shape shape-3"></div>
          
          {/* Elementos de luxo flutuantes */}
          <div className="floating-gem gem-1">
            <IoDiamondOutline />
          </div>
          <div className="floating-gem gem-2">
            <FaRegGem />
          </div>
          <div className="floating-gem gem-3">
            <GiHearts />
          </div>
          <div className="floating-gem gem-4">
            <GiPearlNecklace />
          </div>
          <div className="floating-gem gem-5">
            <FaCrown />
          </div>
          <div className="floating-gem gem-6">
            <IoSparkles />
          </div>
        </div>
        
        <div className="container">
          <div className="banner-content">
            <div className="banner-text">
              <div className="pre-title">
                <span className="pre-title-line">Bem-vindo ao Nosso</span>
              </div>
              
              <h1>
                <span className="title-line" ref={el => titleRefs.current[0] = el}>
                  <span className="word">Cantinho</span>
                </span>
                <span className="title-line" ref={el => titleRefs.current[1] = el}>
                  <span className="word">Do</span> 
                </span>
                <span className="title-line" ref={el => titleRefs.current[2] = el}>
                  <span className="word">Universo</span>
                </span>
              </h1>
              
              <p className="quote">
                <FaQuoteLeft className="quote-icon" />
                <span className="quote-text">"Onde cada momento é uma obra-prima em nossa galeria de afetos"</span>
              </p>
              
              <div className="days-counter">
                <div className="counter-content">
                  <span className="days-number">{days}</span>
                  <span className="days-text">dias de devoção absoluta</span>
                </div>
                <div className="counter-decoration">
                  <div className="decoration-line"></div>
                  <div className="decoration-heart">
                    <FaHeart />
                  </div>
                  <div className="decoration-line"></div>
                </div>
              </div>
            </div>
            
            <div className="scroll-indicator">
              <span className="scroll-text">Explore Nossa Herança</span>
              <div className="scroll-line">
                <FaArrowDown className="scroll-arrow" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Assinatura de luxo */}
        <div className="luxury-signature">
          <span>Eternamente Seu</span>
        </div>
      </header>
      
      {/* Seções de Conteúdo */}
      <main className="main-content">
        <div className="container">
          <div className="section-header">
            <h2>
              <span className="section-title-line">Nova Coleção</span>
              <span className="section-title-line">de Momentos Únicos</span>
            </h2>
            <p className="section-subtitle">Cada experiência é uma joia rara em nosso tesouro afetivo, meticulosamente elaborada para a eternidade</p>
          </div>
          
          <div className="sections-grid">
            {sections.map((section, index) => (
              <div 
                key={section.id} 
                ref={el => {
                  sectionRefs.current[index] = el;
                  magneticRefs.current[index] = el;
                }}
                className="section-card"
                style={{ '--accent-color': section.color }}
              >
                <div className="card-header">
                  <div 
                    className="card-icon-container"
                    style={{ background: section.gradient }}
                  >
                    <div className="card-icon-shine"></div>
                    <div className="card-icon-glow"></div>
                    {section.icon}
                  </div>
                  <div className="card-badge">Exclusivo</div>
                </div>
                
                <div className="card-content">
                  <h3>{section.title}</h3>
                  <p>{section.description}</p>
                  
                  <Link 
                    to={`/${section.id}`} 
                    className="card-link"
                  >
                    <span>{section.buttonText}</span>
                    <div className="link-arrow-container">
                      <FaChevronRight className="link-arrow" />
                    </div>
                  </Link>
                </div>
                
                <div className="card-corner-tl"></div>
                <div className="card-corner-tr"></div>
                <div className="card-corner-bl"></div>
                <div className="card-corner-br"></div>
                
                <div className="card-hover-effect"></div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      {/* Assinatura Final de Luxo */}
      <section className="final-luxury-signature">
        <div className="container">
          <div className="luxury-signature-content">
            <div className="signature-icon">
              <IoDiamondOutline />
              <div className="signature-sparkle"></div>
            </div>
            <h3>Para Sempre em Nossos Corações</h3>
            <p>Este amor é nossa mais preciosa criação</p>
            
            <div className="signature-decoration">
              <div className="decoration-line"></div>
              <div className="decoration-diamond"></div>
              <div className="decoration-line"></div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;