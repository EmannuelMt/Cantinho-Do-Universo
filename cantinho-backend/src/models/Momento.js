const mongoose = require('mongoose');

const momentoSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    required: true
  },
  data: {
    type: Date,
    required: true,
    default: Date.now
  },
  humor: {
    type: String,
    enum: ['feliz', 'apaixonado', 'animado', 'relaxado', 'nostalgico', 'outro'],
    default: 'feliz'
  },
  tags: [{
    type: String,
    trim: true
  }],
  fotos: [{
    type: String // URLs das fotos
  }],
  criadoPor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  privado: {
    type: Boolean,
    default: true
  },
  reacoes: [{
    usuario: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    tipo: {
      type: String,
      enum: ['❤️', '😍', '😂', '🥺']
    }
  }],
  comentarios: [{
    usuario: {
      type: mongoose.Schema.ObjectId,
      ref: 'User'
    },
    texto: {
      type: String,
      required: true
    },
    data: {
      type: Date,
      default: Date.now
    }
  }],
  favoritado: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Momento', momentoSchema);