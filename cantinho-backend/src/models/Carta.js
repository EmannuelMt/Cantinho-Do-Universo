const mongoose = require('mongoose');

const cartaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  conteudo: {
    type: String,
    required: true
  },
  tema: {
    type: String,
    enum: ['romantico', 'classico', 'divertido', 'nostalgico', 'surpresa'],
    default: 'romantico'
  },
  remetente: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  destinatario: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  dataEnvio: {
    type: Date,
    default: Date.now
  },
  dataAgendada: {
    type: Date // Para cartas agendadas
  },
  dataAbertura: {
    type: Date // Quando foi aberta pelo destinatário
  },
  aberta: {
    type: Boolean,
    default: false
  },
  favorita: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Índices para buscas eficientes
cartaSchema.index({ remetente: 1, dataEnvio: -1 });
cartaSchema.index({ destinatario: 1, dataEnvio: -1 });

module.exports = mongoose.model('Carta', cartaSchema);