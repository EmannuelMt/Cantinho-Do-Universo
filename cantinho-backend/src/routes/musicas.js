const express = require('express');
const { body, validationResult } = require('express-validator');
const Musica = require('../models/Musica');
const { protect } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(protect);

// GET /api/musicas - Obter todas as músicas do usuário
router.get('/', async (req, res) => {
  try {
    const { favoritas, page = 1, limit = 10 } = req.query;
    
    let query = { criadoPor: req.user._id };
    if (favoritas === 'true') {
      query.favorita = true;
    }
    
    const musicas = await Musica.find(query)
      .populate('criadoPor', 'nome apelido')
      .sort({ dataAdicionada: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Musica.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: musicas.length,
      total,
      paginas: Math.ceil(total / limit),
      pagina: parseInt(page),
      data: musicas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar músicas' });
  }
});

// GET /api/musicas/:id - Obter uma música específica
router.get('/:id', async (req, res) => {
  try {
    const musica = await Musica.findOne({ 
      _id: req.params.id, 
      criadoPor: req.user._id 
    }).populate('criadoPor', 'nome apelido');
    
    if (!musica) {
      return res.status(404).json({ message: 'Música não encontrada' });
    }
    
    res.status(200).json({
      success: true,
      data: musica
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar música' });
  }
});

// POST /api/musicas - Adicionar nova música
router.post('/', [
  body('titulo').notEmpty().withMessage('Título é obrigatório'),
  body('artista').notEmpty().withMessage('Artista é obrigatório'),
  body('url').notEmpty().withMessage('URL é obrigatória')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { titulo, artista, url, duracao, letra, significado, tags } = req.body;
    
    const musica = await Musica.create({
      titulo,
      artista,
      url,
      duracao,
      letra,
      significado,
      tags,
      criadoPor: req.user._id
    });
    
    await musica.populate('criadoPor', 'nome apelido');
    
    res.status(201).json({
      success: true,
      data: musica
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar música' });
  }
});

// PUT /api/musicas/:id - Atualizar música
router.put('/:id', async (req, res) => {
  try {
    const musica = await Musica.findOneAndUpdate(
      { _id: req.params.id, criadoPor: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('criadoPor', 'nome apelido');
    
    if (!musica) {
      return res.status(404).json({ message: 'Música não encontrada' });
    }
    
    res.status(200).json({
      success: true,
      data: musica
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar música' });
  }
});

// DELETE /api/musicas/:id - Deletar música
router.delete('/:id', async (req, res) => {
  try {
    const musica = await Musica.findOneAndDelete({
      _id: req.params.id,
      criadoPor: req.user._id
    });
    
    if (!musica) {
      return res.status(404).json({ message: 'Música não encontrada' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Música deletada com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar música' });
  }
});

module.exports = router;