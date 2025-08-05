import { motion } from 'framer-motion';
import { 
  FaHeart, 
  FaEnvelope, 
  FaPhone, 
  FaGithub,
  FaInstagram
} from 'react-icons/fa';
import { RiSparklingFill } from 'react-icons/ri';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Início", path: "/" },
    { name: "Momentos", path: "/momentos" },
    { name: "Cartas", path: "/cartas" },
    { name: "Jogos", path: "/jogos" },
    { name: "Músicas", path: "/musicas" }
  ];

  return (
    <motion.footer 
      className="footer"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      <div className="footer-container">
        {/* Seção Superior */}
        <div className="footer-top">
          {/* Logo e Slogan */}
          <div className="footer-brand">
            <h3 className="footer-logo">Nosso Universo</h3>
            <p className="footer-slogan">Memórias que valem ouro</p>
          </div>

          {/* Links Úteis */}
          <div className="footer-links">
            <h4 className="links-title">Navegação</h4>
            <ul>
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 3 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href={link.path} className="nav-link">{link.name}</a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div className="footer-contact">
            <h4 className="contact-title">Contato</h4>
            <ul>
              <motion.li whileHover={{ x: 3 }}>
                <FaEnvelope className="contact-icon" />
                <span>contato@exemplo.com</span>
              </motion.li>
              <motion.li whileHover={{ x: 3 }}>
                <FaPhone className="contact-icon" />
                <span>(00) 91234-5678</span>
              </motion.li>
            </ul>
          </div>
        </div>

        {/* Divisor */}
        <div className="footer-divider"></div>

        {/* Seção Inferior */}
        <div className="footer-bottom">
          <motion.p 
            className="copyright"
            whileHover={{ scale: 1.02 }}
          >
            © {currentYear} Feito com 
            <motion.span 
              className="heart"
              whileHover={{ scale: 1.3 }}
              transition={{ type: "spring", stiffness: 500 }}
            >
              <FaHeart className="heart-icon" />
              <RiSparklingFill className="sparkle sparkle-1" />
              <RiSparklingFill className="sparkle sparkle-2" />
            </motion.span> 
            por Emannuel
          </motion.p>

          <div className="social-media">
            <motion.a 
              href="https://github.com/seu-usuario" 
              target="_blank"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaGithub className="social-icon" />
            </motion.a>
            <motion.a 
              href="https://instagram.com/seu-usuario" 
              target="_blank"
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              <FaInstagram className="social-icon" />
            </motion.a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;