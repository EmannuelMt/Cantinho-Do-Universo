const jwt = require('jsonwebtoken');
const admin = require('../config/firebase');
const User = require('../models/User');

// Proteger rotas - verificar token
exports.protect = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Acesso negado. Token não fornecido.' });
    }
    
    let decoded;
    
    // Verificar se é token do Firebase ou JWT local
    if (token.startsWith('firebase_')) {
      // Token do Firebase
      const firebaseToken = token.replace('firebase_', '');
      decoded = await admin.auth().verifyIdToken(firebaseToken);
      
      // Buscar usuário pelo UID do Firebase
      const user = await User.findOne({ firebaseUid: decoded.uid });
      
      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado.' });
      }
      
      req.user = user;
    } else {
      // Token JWT local
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Buscar usuário pelo ID do token
      const user = await User.findById(decoded.id);
      
      if (!user) {
        return res.status(401).json({ message: 'Token inválido. Usuário não encontrado.' });
      }
      
      req.user = user;
    }
    
    next();
  } catch (error) {
    console.error('Erro de autenticação:', error);
    res.status(401).json({ message: 'Token inválido.' });
  }
};

// Gerar token JWT
exports.signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE
  });
};

// Middleware para verificar se usuário está autenticado via Firebase
exports.firebaseAuth = async (req, res, next) => {
  try {
    let token;
    
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }
    
    if (!token) {
      return res.status(401).json({ message: 'Token não fornecido.' });
    }
    
    const decoded = await admin.auth().verifyIdToken(token);
    req.firebaseUser = decoded;
    next();
  } catch (error) {
    console.error('Erro de autenticação Firebase:', error);
    res.status(401).json({ message: 'Token Firebase inválido.' });
  }
};