const mongoose = require('mongoose');

const musicaSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: true,
    trim: true
  },
  artista: {
    type: String,
    required: true
  },
  url: {
    type: String, // URL do áudio ou link do YouTube/Spotify
    required: true
  },
  duracao: {
    type: Number, // Duração em segundos
    default: 0
  },
  letra: {
    type: String,
    default: ''
  },
  significado: {
    type: String,
    default: ''
  },
  favorita: {
    type: Boolean,
    default: false
  },
  criadoPor: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  },
  dataAdicionada: {
    type: Date,
    default: Date.now
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Musica', musicaSchema);