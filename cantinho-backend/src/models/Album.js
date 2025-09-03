const mongoose = require('mongoose');

const albumSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  descricao: {
    type: String,
    default: ''
  },
  capa: {
    type: String, // URL da imagem de capa
    default: ''
  },
  fotos: [{
    url: {
      type: String,
      required: true
    },
    legenda: {
      type: String,
      default: ''
    },
    data: {
      type: Date,
      default: Date.now
    },
    favorita: {
      type: Boolean,
      default: false
    }
  }],
  tema: {
    type: String,
    enum: ['viagens', 'datas-especiais', 'passeios', 'casual', 'outro'],
    default: 'outro'
  },
  criadoPor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  privado: {
    type: Boolean,
    default: true
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Índice para busca mais eficiente
albumSchema.index({ criadoPor: 1, dataCriacao: -1 });

module.exports = mongoose.model('Album', albumSchema);