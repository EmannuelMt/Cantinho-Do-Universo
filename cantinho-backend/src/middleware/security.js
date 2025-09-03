const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const cors = require('cors');

// Configurações de CORS
const corsOptions = {
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://seusite.com', 'https://www.seusite.com']
    : ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  optionsSuccessStatus: 200
};

// Rate limiting para diferentes endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // 5 tentativas por windowMs
  message: {
    error: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
  },
  skipSuccessfulRequests: true
});

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // 100 requests por windowMs
  message: {
    error: 'Muitas requisições. Tente novamente em 15 minutos.'
  }
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora
  max: 10, // 10 uploads por hora
  message: {
    error: 'Limite de uploads excedido. Tente novamente em 1 hora.'
  }
});

// Headers de segurança
const securityHeaders = helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
      fontSrc: ["'self'", "https://fonts.gstatic.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
      mediaSrc: ["'self'", "https://res.cloudinary.com"],
      scriptSrc: ["'self'", "'unsafe-inline'"]
    }
  },
  crossOriginEmbedderPolicy: false
});

module.exports = {
  corsOptions,
  authLimiter,
  apiLimiter,
  uploadLimiter,
  securityHeaders
};