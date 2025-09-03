const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    minlength: 6,
    select: false
  },
  firebaseUid: {
    type: String,
    unique: true,
    sparse: true
  },
  apelido: {
    type: String,
    default: ''
  },
  dataAniversario: {
    type: Date
  },
  fotoPerfil: {
    type: String,
    default: ''
  },
  parceiroId: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  dataCriacao: {
    type: Date,
    default: Date.now
  },
  ultimoAcesso: {
    type: Date,
    default: Date.now
  },
  configuracao: {
    tema: {
      type: String,
      enum: ['claro', 'escuro', 'auto'],
      default: 'escuro'
    },
    notificacoes: {
      type: Boolean,
      default: true
    },
    privacidadePadrao: {
      type: String,
      enum: ['publico', 'privado', 'casal'],
      default: 'casal'
    }
  }
});

// Criptografar password antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Atualizar último acesso
userSchema.methods.atualizarUltimoAcesso = function() {
  this.ultimoAcesso = new Date();
  return this.save();
};

// Verificar password
userSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

// Buscar parceiro
userSchema.methods.getParceiro = async function() {
  if (!this.parceiroId) return null;
  return await User.findById(this.parceiroId).select('nome apelido fotoPerfil dataAniversario');
};

module.exports = mongoose.model('User', userSchema);