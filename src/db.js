// src/db.js
const { Pool } = require('pg');

// Conexão com o banco de dados
const pool = new Pool({
  user: 'seu-usuario',
  host: 'localhost',
  database: 'kelly',  // O nome do seu banco de dados
  password: 'sua-senha',
  port: 5432,  // Porta padrão do PostgreSQL
});

module.exports = pool;
