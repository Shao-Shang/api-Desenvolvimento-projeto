// src/models.js
const { Client } = require('pg');

const client = new Client({
  host: 'localhost',      // Host do banco de dados
  port: 5432,             // Porta do PostgreSQL
  database: 'nome_do_banco',  // Substitua pelo nome do seu banco de dados
  user: 'kelly',          // Substitua com seu nome de usuário do PostgreSQL
  password: '33069425Tina', // Substitua pela senha do seu banco de dados
});

// Conecta ao banco de dados de maneira assíncrona
const connectDb = async () => {
  try {
    await client.connect();  // Espera pela conexão do banco
    console.log('Conectado ao banco de dados com sucesso!');
  } catch (err) {
    console.error('Erro ao conectar ao banco de dados:', err.stack);
  }
};

// Função para desconectar do banco (se necessário)
const disconnectDb = async () => {
  await client.end();
};

module.exports = { client, connectDb, disconnectDb };



