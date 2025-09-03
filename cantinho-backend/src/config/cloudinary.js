const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configurar Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurar storage para diferentes tipos de mídia
const fotoStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cantinho-universo/fotos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
  }
});

const audioStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cantinho-universo/audios',
    resource_type: 'video', // Cloudinary trata áudios como vídeos
    allowed_formats: ['mp3', 'wav', 'ogg', 'm4a']
  }
});

const capaStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'cantinho-universo/capas',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 500, height: 500, crop: 'fill' }]
  }
});

module.exports = {
  cloudinary,
  fotoStorage,
  audioStorage,
  capaStorage
};