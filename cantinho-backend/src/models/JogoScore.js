const mongoose = require('mongoose');

const jogoScoreSchema = new mongoose.Schema({
  jogo: {
    type: String,
    required: true,
    enum: ['quiz', 'memoria', 'this-or-that']
  },
  jogador: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  pontuacao: {
    type: Number,
    required: true
  },
  nivel: {
    type: String,
    enum: ['facil', 'medio', 'dificil'],
    default: 'medio'
  },
  tempo: {
    type: Number // Tempo em segundos
  },
  detalhes: {
    type: mongoose.Schema.Types.Mixed // Dados específicos de cada jogo
  },
  dataPartida: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice composto para ranking
jogoScoreSchema.index({ jogo: 1, nivel: 1, pontuacao: -1 });

module.exports = mongoose.model('JogoScore', jogoScoreSchema);