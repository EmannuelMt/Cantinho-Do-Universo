const express = require('express');
const JogoScore = require('../models/JogoScore');
const { protect } = require('../middleware/auth');

const router = express.Router();

// Aplicar middleware de autenticação a todas as rotas
router.use(protect);

// GET /api/jogos/scores - Obter scores do usuário
router.get('/scores', async (req, res) => {
  try {
    const { jogo, nivel, page = 1, limit = 10 } = req.query;
    
    let query = { jogador: req.user._id };
    if (jogo) query.jogo = jogo;
    if (nivel) query.nivel = nivel;
    
    const scores = await JogoScore.find(query)
      .populate('jogador', 'nome apelido')
      .sort({ pontuacao: -1, tempo: 1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await JogoScore.countDocuments(query);
    
    res.status(200).json({
      success: true,
      count: scores.length,
      total,
      paginas: Math.ceil(total / limit),
      pagina: parseInt(page),
      data: scores
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar scores' });
  }
});

// GET /api/jogos/ranking - Obter ranking geral
router.get('/ranking', async (req, res) => {
  try {
    const { jogo, nivel } = req.query;
    
    let query = {};
    if (jogo) query.jogo = jogo;
    if (nivel) query.nivel = nivel;
    
    // Buscar os melhores scores
    const ranking = await JogoScore.find(query)
      .populate('jogador', 'nome apelido fotoPerfil')
      .sort({ pontuacao: -1, tempo: 1 })
      .limit(20);
    
    res.status(200).json({
      success: true,
      count: ranking.length,
      data: ranking
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar ranking' });
  }
});

// POST /api/jogos/scores - Salvar score de jogo
router.post('/scores', async (req, res) => {
  try {
    const { jogo, pontuacao, nivel, tempo, detalhes } = req.body;
    
    const score = await JogoScore.create({
      jogo,
      pontuacao,
      nivel: nivel || 'medio',
      tempo,
      detalhes,
      jogador: req.user._id
    });
    
    await score.populate('jogador', 'nome apelido');
    
    res.status(201).json({
      success: true,
      data: score
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao salvar score' });
  }
});

// GET /api/jogos/quiz/perguntas - Obter perguntas do quiz do casal
router.get('/quiz/perguntas', async (req, res) => {
  try {
    // Perguntas pré-definidas sobre o relacionamento
    const perguntas = [
      {
        pergunta: "Qual foi nosso primeiro date?",
        tipo: "multipla-escolha",
        opcoes: ["Cinema", "Restaurante", "Parque", "Praia"],
        resposta: 1 // Ajustar conforme a realidade do casal
      },
      {
        pergunta: "Qual é minha comida favorita?",
        tipo: "multipla-escolha",
        opcoes: ["Pizza", "Sushi", "Hambúrguer", "Lasanha"],
        resposta: 0
      },
      {
        pergunta: "Onde nos conhecemos?",
        tipo: "multipla-escolha",
        opcoes: ["Escola/Faculdade", "Trabalho", "Amigos em comum", "App de relacionamento"],
        resposta: 2
      },
      // Adicionar mais perguntas personalizadas
    ];
    
    res.status(200).json({
      success: true,
      count: perguntas.length,
      data: perguntas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao buscar perguntas' });
  }
});

module.exports = router;