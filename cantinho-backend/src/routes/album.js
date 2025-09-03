const express = require('express');
const { body, validationResult } = require('express-validator');
const Album = require('../models/Album');
const { protect } = require('../middleware/auth');
const { upload, handleUploadError } = require('../middleware/upload');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(protect);

// GET /api/album - Obter todos os álbuns do usuário
router.get('/', async (req, res) => {
  try {
    const albuns = await Album.find({ criadoPor: req.user._id })
      .populate('criadoPor', 'nome apelido')
      .sort({ dataCriacao: -1 });
    
    res.status(200).json({
      success: true,
      count: albuns.length,
      data: albuns
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar álbuns' });
  }
});

// GET /api/album/:id - Obter um álbum específico
router.get('/:id', async (req, res) => {
  try {
    const album = await Album.findOne({ 
      _id: req.params.id, 
      criadoPor: req.user._id 
    }).populate('criadoPor', 'nome apelido');
    
    if (!album) {
      return res.status(404).json({ message: 'Álbum não encontrado' });
    }
    
    res.status(200).json({
      success: true,
      data: album
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar álbum' });
  }
});

// POST /api/album - Criar novo álbum
router.post('/', [
  body('titulo').notEmpty().withMessage('Título é obrigatório')
], async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    
    const { titulo, descricao, tema, capa, privado } = req.body;
    
    const album = await Album.create({
      titulo,
      descricao,
      tema,
      capa,
      privado: privado !== undefined ? privado : true,
      criadoPor: req.user._id
    });
    
    await album.populate('criadoPor', 'nome apelido');
    
    res.status(201).json({
      success: true,
      data: album
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao criar álbum' });
  }
});

// PUT /api/album/:id - Atualizar álbum
router.put('/:id', async (req, res) => {
  try {
    const album = await Album.findOneAndUpdate(
      { _id: req.params.id, criadoPor: req.user._id },
      req.body,
      { new: true, runValidators: true }
    ).populate('criadoPor', 'nome apelido');
    
    if (!album) {
      return res.status(404).json({ message: 'Álbum não encontrado' });
    }
    
    res.status(200).json({
      success: true,
      data: album
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar álbum' });
  }
});

// POST /api/album/:id/fotos - Adicionar fotos ao álbum
router.post('/:id/fotos', upload.array('fotos', 10), async (req, res) => {
  try {
    const album = await Album.findOne({ 
      _id: req.params.id, 
      criadoPor: req.user._id 
    });
    
    if (!album) {
      return res.status(404).json({ message: 'Álbum não encontrado' });
    }
    
    // Adicionar URLs das fotos (em produção, isso viria do Cloudinary/Firebase)
    const novasFotos = req.files.map(file => ({
      url: `/uploads/${file.filename}`,
      legenda: req.body.legenda || '',
      data: new Date()
    }));
    
    album.fotos.push(...novasFotos);
    await album.save();
    
    res.status(200).json({
      success: true,
      message: 'Fotos adicionadas com sucesso',
      data: novasFotos
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao adicionar fotos' });
  }
});

// DELETE /api/album/:id - Deletar álbum
router.delete('/:id', async (req, res) => {
  try {
    const album = await Album.findOneAndDelete({
      _id: req.params.id,
      criadoPor: req.user._id
    });
    
    if (!album) {
      return res.status(404).json({ message: 'Álbum não encontrado' });
    }
    
    res.status(200).json({
      success: true,
      message: 'Álbum deletado com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao deletar álbum' });
  }
});

// Middleware para tratar erros de upload
router.use(handleUploadError);

module.exports = router;