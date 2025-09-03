const multer = require('multer');
const { fotoStorage, audioStorage, capaStorage } = require('../config/cloudinary');

// Configurações específicas para cada tipo de arquivo
const uploadFoto = multer({
  storage: fotoStorage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'), false);
    }
  }
});

const uploadAudio = multer({
  storage: audioStorage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas áudios são permitidos'), false);
    }
  }
});

const uploadCapa = multer({
  storage: capaStorage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Apenas imagens são permitidas'), false);
    }
  }
});

// Middleware para deletar arquivos em caso de erro
const cleanupOnError = (req, res, next) => {
  res.on('finish', async () => {
    if (res.statusCode >= 400 && req.files) {
      try {
        const { cloudinary } = require('../config/cloudinary');
        for (const file of req.files) {
          if (file.path) {
            const publicId = file.filename; // Cloudinary usa public_id
            await cloudinary.uploader.destroy(publicId);
          }
        }
      } catch (error) {
        console.error('Erro ao limpar arquivos:', error);
      }
    }
  });
  next();
};

// Middleware para lidar com erros de upload
const handleUploadError = (error, req, res, next) => {
  if (error instanceof multer.MulterError) {
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ 
        message: 'Arquivo muito grande. Tamanho máximo: 5MB para imagens, 10MB para áudios' 
      });
    }
    if (error.code === 'LIMIT_UNEXPECTED_FILE') {
      return res.status(400).json({ 
        message: 'Número máximo de arquivos excedido' 
      });
    }
  }
  res.status(400).json({ message: error.message });
};

module.exports = {
  uploadFoto,
  uploadAudio,
  uploadCapa,
  cleanupOnError,
  handleUploadError
};