const express = require('express');
const { body, validationResult } = require('express-validator');
const Carta = require('../models/Carta');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(protect);

// GET /api/cartas - Obter cartas do usuário (enviadas e recebidas)
router.get('/', async (req, res) => {
  try {
    const { tipo, page = 1, limit = 10 } = req.query;
    
    let query;
    if (tipo === 'enviadas') {
      query = { remetente: req.user._id };
    } else if (tipo === 'recebidas') {
      query = { destinatario: req.user._id };
    } else {
      query = {
        $or: [
          { remetente: req.user._id },
          { destinatario: req.user._id }
        ]
      };
    }
    
    const cartas = await Carta.find(query)
      .populate('remetente', 'nome apelido')
      .populate('destinatario', 'nome apelido')
      .sort({ dataEnvio: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Carta.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: cartas.length,
      total,
      paginas: Math.ceil(total / limit),
      pagina: parseInt(page),
      data: cartas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar cartas' });
  }
});

// GET /api/cartas/:id - Obter uma carta específica
router.get('/:id', async (req, res) => {
  try {
    const carta = await Carta.findOne({
      _id: req.params.id,
      $or: [
        { remetente: req.user._id },
        { destinatario: req.user._id }
      ]
    })
    .populate('remetente', 'nome apelido fotoPerfil')
    .populate('destinatario', 'nome apelido fotoPerfil');
    
    if (!carta) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }
    
    // Se o usuário é o destinatário e a carta ainda não foi aberta, marcar como aberta
    if (carta.destinatario._id.equals(req.user._id) && !carta.aberta) {
      carta.aberta = true;
      carta.dataAbertura = new Date();
      await carta.save();
    }
    
    res.status(200).json({
      success: true,
      data: carta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar carta' });
  }
});

// POST /api/cartas - Enviar nova carta
router.post('/', [
  body('titulo').notEmpty().withMessage('Título é obrigatório'),
  body('conteudo').notEmpty().withMessage('Conteúdo é obrigatório'),
  body('destinatario').notEmpty().withMessage('Destinatário é obrigatório')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { titulo, conteudo, destinatario, tema, dataAgendada } = req.body;
    
    // Verificar se o destinatário existe
    const destinatarioUser = await User.findById(destinatario);
    if (!destinatarioUser) {
      return res.status(404).json({ message: 'Destinatário não encontrado' });
    }
    
    // Não permitir enviar carta para si mesmo
    if (destinatario === req.user._id.toString()) {
      return res.status(400).json({ message: 'Não é possível enviar uma carta para si mesmo' });
    }
    
    const carta = await Carta.create({
      titulo,
      conteudo,
      tema,
      remetente: req.user._id,
      destinatario,
      dataAgendada: dataAgendada || null
    });
    
    await carta.populate('remetente', 'nome apelido');
    await carta.populate('destinatario', 'nome apelido');
    
    res.status(201).json({
      success: true,
      data: carta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar carta' });
  }
});

// PUT /api/cartas/:id - Atualizar carta (apenas se for o remetente)
router.put('/:id', async (req, res) => {
  try {
    const carta = await Carta.findOneAndUpdate(
      { _id: req.params.id, remetente: req.user._id },
      req.body,
      { new: true, runValidators: true }
    )
    .populate('remetente', 'nome apelido')
    .populate('destinatario', 'nome apelido');
    
    if (!carta) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }
    
    res.status(200).json({
      success: true,
      data: carta
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar carta' });
  }
});

// DELETE /api/cartas/:id - Deletar carta (apenas se for o remetente)
router.delete('/:id', async (req, res) => {
  try {
    const carta = await Carta.findOneAndDelete({
      _id: req.params.id,
      remetente: req.user._id
    });
    
    if (!carta) {
      return res.status(404).json({ message: 'Carta não encontrada' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Carta deletada com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar carta' });
  }
});

module.exports = router;