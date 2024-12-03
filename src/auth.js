// src/auth.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');  // Usando bcryptjs

// Função para gerar o token JWT
const generateToken = (userId) => {
    return jwt.sign({ userId }, 'seu-segredo', { expiresIn: '1h' });
};

// Função para comparar senhas com bcryptjs
const comparePasswords = (password, hash) => {
    return bcrypt.compare(password, hash);  // A comparação assíncrona é mais segura
};

module.exports = { generateToken, comparePasswords };

