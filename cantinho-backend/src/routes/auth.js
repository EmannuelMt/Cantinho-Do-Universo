const express = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User');
const { signToken } = require('../middleware/auth');

const router = express.Router();

// Registrar usuário
router.post('/register', [
  body('nome').notEmpty().withMessage('Nome é obrigatório'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { nome, email, password, apelido, dataAniversario } = req.body;
    
    // Verificar se usuário já existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }
    
    // Criar usuário
    const user = await User.create({
      nome,
      email,
      password,
      apelido,
      dataAniversario
    });
    
    // Gerar token
    const token = signToken(user._id);
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        apelido: user.apelido
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Login
router.post('/login', [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { email, password } = req.body;
    
    // Verificar se usuário existe e senha está correta
    const user = await User.findOne({ email }).select('+password');
    
    if (!user || !(await user.correctPassword(password, user.password))) {
      return res.status(401).json({ message: 'Email ou senha incorretos' });
    }
    
    // Gerar token
    const token = signToken(user._id);
    
    res.json({
      success: true,
      token,
      user: {
        id: user._id,
        nome: user.nome,
        email: user.email,
        apelido: user.apelido
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

// Obter perfil do usuário
router.get('/profile', async (req, res) => {
  try {
    // Esta rota precisa ser protegida com o middleware de autenticação
    // Por enquanto retorna mensagem
    res.status(200).json({ message: 'Rota de perfil - precisa implementar autenticação' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro no servidor' });
  }
});

module.exports = router;