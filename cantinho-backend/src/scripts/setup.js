const mongoose = require('mongoose');
require('dotenv').config();

async function setupDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Conectado ao MongoDB');
    
    // Criar índices para melhor performance
    const models = require('../src/models');
    
    await models.User.createIndexes();
    await models.Momento.createIndexes();
    await models.Album.createIndexes();
    await models.Carta.createIndexes();
    
    console.log('Índices criados com sucesso');
    process.exit(0);
  } catch (error) {
    console.error('Erro no setup:', error);
    process.exit(1);
  }
}

setupDatabase();