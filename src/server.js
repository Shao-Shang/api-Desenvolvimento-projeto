require('dotenv').config();  // Carrega as variáveis do .env no seu código

const jwtSecret = process.env.JWT_SECRET; // Agora você pode acessar a chave secreta

// src/server.js
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');  // Usando bcrypt para comparar as senhas
const { generateToken } = require('./auth'); // Função de geração do token
const db = require('./models'); // Conexão com o banco de dados
const app = express();
const PORT = process.env.PORT || 3000;3001

// Middleware para habilitar JSON nas requisições
app.use(express.json());

// Middleware para verificar o token JWT
const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(403).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1]; // Extrai o token do formato "Bearer <token>"
    if (!token) {
        return res.status(403).json({ error: 'Token no formato incorreto' });
    }
    console.log('Verificando token:', token); // Log para verificar se o token está sendo passado corretamente

    jwt.verify(token, 'seu-segredo', (err, decoded) => {
        if (err) {
            return res.status(403).json({ error: 'Token inválido' });
        }
        req.userId = decoded.userId; // Decodifica o userId e salva no objeto req
        next(); // Continua para a próxima etapa
    });
};

// Função para comparar a senha (com bcrypt)
const comparePasswords = (inputPassword, storedHash) => {
    return bcrypt.compare(inputPassword, storedHash);  // Compara a senha de entrada com o hash armazenado
};

// Rota de login
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    console.log('Tentando fazer login com:', email); // Log para depurar
    
    app.post('/register', (req, res) => {
        const { email, password } = req.body;
    
        // Aqui você pode adicionar lógica para cadastrar o usuário
        res.status(201).json({ message: 'Usuário registrado com sucesso!' });

    });

    //Gerar Token
    const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const PORT = 3000;3001

app.use(express.json());

// Rota POST para gerar o token
app.post('/', (req, res) => {
    // Aqui você pode validar ou pegar dados do corpo da requisição, por exemplo
    const user = req.body.user || 'defaultUser'; // Exemplo de um usuário fictício

    // Gerar o token (exemplo de payload e chave secreta)
    const token = jwt.sign(
        { username: user },    // Payload (informações do usuário)
        'chave-secreta',       // Chave secreta para assinar o token
        { expiresIn: '1h' }    // Opcional: Define a expiração do token (1 hora neste caso)
    );

    // Enviar a resposta com o token gerado
    res.status(200).json({
        token: token
    });
});

// Iniciando o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

    // Consultando o usuário no banco de dados
    db.query('SELECT * FROM users WHERE email = $1', [email])
        .then(result => {
            if (result.rows.length > 0) {
                const user = result.rows[0];
                console.log('Usuário encontrado:', user);

                // Verificando a senha do usuário
                comparePasswords(password, user.senha)
                    .then(isValid => {
                        if (isValid) {
                            console.log('Senha correta, gerando o token...');
                            const token = generateToken(user.id); // Gera um token para o usuário
                            res.json({ token });
                        } else {
                            console.log('Senha incorreta');
                            res.status(401).json({ error: 'Credenciais inválidas' });
                        }
                    })
                    .catch(err => {
                        console.error('Erro ao comparar as senhas:', err); // Log do erro ao comparar as senhas
                        res.status(500).json({ error: 'Erro ao verificar a senha' });
                    });
            } else {
                console.log('Usuário não encontrado');
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        })
        .catch(err => {
            console.error('Erro ao consultar o banco de dados:', err); // Log do erro ao consultar o banco de dados
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
});

// Rota protegida
app.get('/profile', verifyToken, (req, res) => {
    const userId = req.userId; // userId decodificado do token JWT

    console.log('Consultando perfil do usuário com ID:', userId); // Log para verificar o ID do usuário

    db.query('SELECT id, name, email FROM users WHERE id = $1', [userId])
        .then(result => {
            if (result.rows.length > 0) {
                console.log('Perfil do usuário encontrado:', result.rows[0]);
                res.json(result.rows[0]); // Retorna os dados do usuário
            } else {
                console.log('Usuário não encontrado no perfil');
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        })
        .catch(err => {
            console.error('Erro ao consultar o banco de dados para perfil:', err); // Log do erro ao consultar o banco de dados
            res.status(500).json({ error: 'Erro interno do servidor' });
        });
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
