const { body, validationResult, param } = require('express-validator');
const mongoose = require('mongoose');

// Validações comuns
const validateObjectId = param('id')
  .isMongoId()
  .withMessage('ID inválido');

const validateEmail = body('email')
  .isEmail()
  .normalizeEmail()
  .withMessage('Email inválido');

const validatePassword = body('password')
  .isLength({ min: 6 })
  .withMessage('Senha deve ter pelo menos 6 caracteres')
  .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
  .withMessage('Senha deve conter letras maiúsculas, minúsculas e números');

// Validação para datas
const validateDate = body('data')
  .optional()
  .isISO8601()
  .withMessage('Data inválida. Use o formato ISO 8601.');

// Validação para URLs
const validateUrl = body('url')
  .optional()
  .isURL()
  .withMessage('URL inválida');

// Middleware para verificar resultados da validação
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      error: 'Dados inválidos',
      details: errors.array()
    });
  }
  next();
};

// Sanitização de dados
const sanitizeInput = (req, res, next) => {
  // Sanitizar campos de texto para prevenir XSS
  const sanitize = (obj) => {
    for (const key in obj) {
      if (typeof obj[key] === 'string') {
        obj[key] = obj[key]
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .substring(0, 1000); // Limitar tamanho
      } else if (typeof obj[key] === 'object' && obj[key] !== null) {
        sanitize(obj[key]);
      }
    }
  };

  if (req.body) sanitize(req.body);
  if (req.query) sanitize(req.query);
  if (req.params) sanitize(req.params);

  next();
};

module.exports = {
  validateObjectId,
  validateEmail,
  validatePassword,
  validateDate,
  validateUrl,
  handleValidationErrors,
  sanitizeInput
};