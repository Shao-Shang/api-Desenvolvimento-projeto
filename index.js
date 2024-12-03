const express = require('express');
const jwt = require('jsonwebtoken');  // Importando o jsonwebtoken para gerar o token
const app = express();
const PORT = 3000;
require('dotenv').config();  // Usando dotenv para carregar variáveis de ambiente

app.use(express.json());

// Rota POST para gerar o token
app.post('/login', (req, res) => {
    // Validação do usuário (aqui você pode melhorar a validação)
    const user = req.body.user || 'defaultUser'; // Exemplo de um usuário fictício

    if (!user) {
        return res.status(400).send({ message: 'Usuário não fornecido!' });
    }

    // Gerar o token (exemplo de payload e chave secreta)
    const token = jwt.sign(
        { username: user },    // Payload (informações do usuário)
        process.env.JWT_SECRET, // Chave secreta da variável de ambiente
        { expiresIn: '1h' }    // Opcional: Define a expiração do token (1 hora neste caso)
    );

    // Retornar o token gerado na resposta
    res.status(200).send({ message: 'Token gerado com sucesso!', token: token });
});

// Rota POST para outros dados (exemplo de uso)
app.post('/data', (req, res) => {
    console.log(req.body);
    res.status(200).send({ message: 'Rota POST criada com sucesso!' });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
