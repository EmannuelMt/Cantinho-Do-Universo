import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaEnvelope, 
  FaPhone, 
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaMusic,
  FaPhotoVideo,
  FaGamepad
} from 'react-icons/fa';
import { 
  RiSparklingFill, 
  RiHeartFill, 
  RiMailFill, 
  RiPhoneFill,
  RiGlobalLine,
  RiCalendarEventFill
} from 'react-icons/ri';
import { 
  IoSparkles,
  IoHeartCircle,
  IoMail,
  IoCall
} from 'react-icons/io5';
import { 
  TbHeartbeat,
  TbMusicHeart,
  TbPhotoHeart
} from 'react-icons/tb';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const startYear = 2023;
  const yearsTogether = currentYear - startYear;

  const quickLinks = [
    { name: "Início", path: "/", icon: <RiHeartFill /> },
    { name: "Momentos", path: "/momentos", icon: <RiCalendarEventFill /> },
    { name: "Cartas", path: "/cartas", icon: <FaHeart /> },
    { name: "Jogos", path: "/jogos", icon: <FaGamepad /> },
    { name: "Músicas", path: "/musicas", icon: <FaMusic /> },
    { name: "Fotos", path: "/fotos", icon: <FaPhotoVideo /> }
  ];

  const socialLinks = [
    { name: "GitHub", url: "https://github.com/seu-usuario", icon: <FaGithub />, color: "#6e5494" },
    { name: "Instagram", url: "https://instagram.com/seu-usuario", icon: <FaInstagram />, color: "#e4405f" },
    { name: "LinkedIn", url: "https://linkedin.com/in/seu-usuario", icon: <FaLinkedin />, color: "#0077b5" },
    { name: "Twitter", url: "https://twitter.com/seu-usuario", icon: <FaTwitter />, color: "#1da1f2" }
  ];

  const contactInfo = [
    { icon: <RiMailFill />, text: "casal@nossouniverso.com", link: "mailto:casal@nossouniverso.com" },
    { icon: <RiPhoneFill />, text: "(00) 91234-5678", link: "tel:+5500912345678" },
    { icon: <RiGlobalLine />, text: "www.nossouniverso.com", link: "https://nossouniverso.com" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  return (
    <motion.footer 
      className="footer"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={containerVariants}
    >
      <div className="footer-background">
        <div className="footer-bg-element"></div>
        <div className="footer-bg-element"></div>
        <div className="footer-bg-element"></div>
      </div>

      <div className="footer-container">
        {/* Seção Superior */}
        <div className="footer-top">
          {/* Logo e Slogan */}
          <motion.div 
            className="footer-brand"
            variants={itemVariants}
          >
            <motion.h3 
              className="footer-logo"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              Nosso Universo
              <motion.span 
                className="logo-heart"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
              >
                <RiHeartFill />
              </motion.span>
            </motion.h3>
            <p className="footer-slogan">Criando memórias desde {startYear}</p>
            <motion.div 
              className="years-together"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.5 }}
            >
              <span>{yearsTogether}</span>
              <small>anos juntos</small>
            </motion.div>
          </motion.div>

          {/* Links Úteis */}
          <motion.div 
            className="footer-links"
            variants={itemVariants}
          >
            <h4 className="links-title">
              <IoSparkles /> Navegação
            </h4>
            <ul>
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="link-icon">{link.icon}</span>
                  <a href={link.path} className="nav-link">
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contato */}
          <motion.div 
            className="footer-contact"
            variants={itemVariants}
          >
            <h4 className="contact-title">
              <IoMail /> Contato
            </h4>
            <ul>
              {contactInfo.map((item, index) => (
                <motion.li 
                  key={index}
                  variants={itemVariants}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <span className="contact-icon">{item.icon}</span>
                  <a href={item.link} className="contact-link">
                    {item.text}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            className="footer-newsletter"
            variants={itemVariants}
          >
            <h4 className="newsletter-title">
              <RiSparklingFill /> Novidades
            </h4>
            <p>Receba atualizações do nosso universo</p>
            <motion.div 
              className="newsletter-form"
              whileHover={{ y: -2 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <input 
                type="email" 
                placeholder="Seu melhor email" 
                className="newsletter-input"
              />
              <motion.button 
                className="newsletter-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <RiSparklingFill />
              </motion.button>
            </motion.div>
          </motion.div>
        </div>

        {/* Divisor */}
        <motion.div 
          className="footer-divider"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />

        {/* Seção Inferior */}
        <div className="footer-bottom">
          <motion.div 
            className="copyright-container"
            variants={itemVariants}
          >
            <motion.p 
              className="copyright"
              whileHover={{ scale: 1.02 }}
            >
              © {currentYear} Feito com 
              <motion.span 
                className="heart"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                whileHover={{ scale: 1.4 }}
              >
                <FaHeart className="heart-icon" />
                <RiSparklingFill className="sparkle sparkle-1" />
                <RiSparklingFill className="sparkle sparkle-2" />
                <RiSparklingFill className="sparkle sparkle-3" />
              </motion.span> 
              por Emannuel
            </motion.p>
            <p className="footer-quote">
              "O amor não se vê com os olhos, mas com o coração." - Shakespeare
            </p>
          </motion.div>

          <motion.div 
            className="social-media"
            variants={itemVariants}
          >
            {socialLinks.map((social, index) => (
              <motion.a 
                key={index}
                href={social.url} 
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ '--social-color': social.color }}
                whileHover={{ y: -5, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <span className="social-icon">{social.icon}</span>
                <span className="social-tooltip">{social.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Elemento decorativo */}
        <motion.div 
          className="footer-decoration"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <TbMusicHeart />
          <TbPhotoHeart />
          <IoHeartCircle />
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;