const express = require('express');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(protect);

// GET /api/configuracoes - Obter configurações do usuário
router.get('/', async (req, res) => {
  try {
    const usuario = await User.findById(req.user._id).select('configuracao');
    
    res.status(200).json({
      success: true,
      data: usuario.configuracao
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar configurações' });
  }
});

// PUT /api/configuracoes - Atualizar configurações do usuário
router.put('/', async (req, res) => {
  try {
    const { tema, notificacoes, privacidadePadrao } = req.body;
    
    const atualizacao = {};
    if (tema) atualizacao['configuracao.tema'] = tema;
    if (notificacoes !== undefined) atualizacao['configuracao.notificacoes'] = notificacoes;
    if (privacidadePadrao) atualizacao['configuracao.privacidadePadrao'] = privacidadePadrao;
    
    const usuario = await User.findByIdAndUpdate(
      req.user._id,
      { $set: atualizacao },
      { new: true, runValidators: true }
    ).select('configuracao');
    
    res.status(200).json({
      success: true,
      data: usuario.configuracao
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar configurações' });
  }
});

// PUT /api/configuracoes/perfil - Atualizar perfil do usuário
router.put('/perfil', async (req, res) => {
  try {
    const { nome, apelido, dataAniversario, fotoPerfil } = req.body;
    
    const atualizacao = {};
    if (nome) atualizacao.nome = nome;
    if (apelido !== undefined) atualizacao.apelido = apelido;
    if (dataAniversario) atualizacao.dataAniversario = dataAniversario;
    if (fotoPerfil !== undefined) atualizacao.fotoPerfil = fotoPerfil;
    
    const usuario = await User.findByIdAndUpdate(
      req.user._id,
      atualizacao,
      { new: true, runValidators: true }
    ).select('nome apelido dataAniversario fotoPerfil');
    
    res.status(200).json({
      success: true,
      data: usuario
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao atualizar perfil' });
  }
});

// POST /api/configuracoes/convidar-parceiro - Convidar parceiro
router.post('/convidar-parceiro', async (req, res) => {
  try {
    const { email } = req.body;
    
    // Verificar se o email existe
    const parceiro = await User.findOne({ email });
    
    if (!parceiro) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    
    if (parceiro._id.equals(req.user._id)) {
      return res.status(400).json({ message: 'Não é possível se convidar' });
    }
    
    // Aqui você implementaria o envio de email de convite
    // Por enquanto, apenas retornamos sucesso
    
    res.status(200).json({
      success: true,
      message: 'Convite enviado com sucesso',
      data: {
        parceiroId: parceiro._id,
        nome: parceiro.nome,
        email: parceiro.email
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao enviar convite' });
  }
});

// POST /api/configuracoes/aceitar-convite - Aceitar convite de parceiro
router.post('/aceitar-convite', async (req, res) => {
  try {
    const { parceiroId } = req.body;
    
    // Verificar se o parceiro existe
    const parceiro = await User.findById(parceiroId);
    
    if (!parceiro) {
      return res.status(404).json({ message: 'Parceiro não encontrado' });
    }
    
    // Atualizar ambos os usuários
    await User.findByIdAndUpdate(req.user._id, { parceiroId });
    await User.findByIdAndUpdate(parceiroId, { parceiroId: req.user._id });
    
    res.status(200).json({
      success: true,
      message: 'Parceiro vinculado com sucesso'
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao aceitar convite' });
  }
});

module.exports = router;