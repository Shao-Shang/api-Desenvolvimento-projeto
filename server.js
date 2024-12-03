// server.js
const express = require('express');
const app = express();
const port = 3000;

// Middleware
app.use(express.json());

// Endpoint de exemplo
app.post('/login', (req, res) => {
  res.send('Login realizado com sucesso!');
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
