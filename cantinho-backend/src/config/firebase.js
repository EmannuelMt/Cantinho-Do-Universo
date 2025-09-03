const admin = require('firebase-admin');

// Inicializar Firebase Admin
const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || '{}');

if (Object.keys(serviceAccount).length > 0) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
  console.log('Firebase Admin inicializado com sucesso');
} else {
  console.log('Firebase Admin não configurado. Usando autenticação local.');
}

module.exports = admin;