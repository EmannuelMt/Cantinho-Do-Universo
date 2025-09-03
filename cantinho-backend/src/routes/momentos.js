const express = require('express');
const { body, validationResult } = require('express-validator');
const Momento = require('../models/Momento');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(protect);

// GET /api/momentos - Obter todos os momentos do usuário
router.get('/', async (req, res) => {
  try {
    const momentos = await Momento.find({ criadoPor: req.user._id })
      .populate('criadoPor', 'nome apelido')
      .sort({ data: -1 });
    
    res.status(200).json({
      success: true,
      count: momentos.length,
      data: momentos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar momentos' });
  }
});

// GET /api/momentos/:id - Obter um momento específico
router.get('/:id', async (req, res) => {
  try {
    const momento = await Momento.findOne({ 
      _id: req.params.id, 
      criadoPor: req.user._id 
    }).populate('criadoPor', 'nome apelido');
    
    if (!momento) {
      return res.status(404).json({ message: 'Momento não encontrado' });
    }
    
    res.status(200).json({
      success: true,
      data: momento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar momento' });
  }
});

// POST /api/momentos - Criar novo momento
router.post('/', [
  body('titulo').notEmpty().withMessage('Título é obrigatório'),
  body('descricao').notEmpty().withMessage('Descrição é obrigatória')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { titulo, descricao, data, humor, tags, fotos, privado } = req.body;
    
    const momento = await Momento.create({
      titulo,
      descricao,
      data: data || Date.now(),
      humor,
      tags,
      fotos,
      privado: privado !== undefined ? privado : true,
      criadoPor: req.user._id
    });
    
    await momento.populate('criadoPor', 'nome apelido');
    
    res.status(201).json({
      success: true,
      data: momento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar momento' });
  }
});

// PUT /api/momentos/:id - Atualizar momento
router.put('/:id', async (req, res) => {
  try {
    const momento = await Momento.findOneAndUpdate(
      { _id: req.params.id, criadoPor: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('criadoPor', 'nome apelido');
    
    if (!momento) {
      return res.status(404).json({ message: 'Momento não encontrado' });
    }
    
    res.status(200).json({
      success: true,
      data: momento
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar momento' });
  }
});

// DELETE /api/momentos/:id - Deletar momento
router.delete('/:id', async (req, res) => {
  try {
    const momento = await Momento.findOneAndDelete({
      _id: req.params.id,
      criadoPor: req.user._id
    });
    
    if (!momento) {
      return res.status(404).json({ message: 'Momento não encontrado' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Momento deletado com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar momento' });
  }
});

module.exports = router;