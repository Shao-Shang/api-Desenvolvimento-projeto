// src/routes.js
const express = require('express');
const router = express.Router();

// Exemplo de uma rota simples
router.get('/', (req, res) => {
  res.send('Bem-vindo à API!');
});

// Você pode adicionar outras rotas conforme necessário

module.exports = router;

