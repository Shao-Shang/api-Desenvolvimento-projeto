const bcrypt = require('bcryptjs');

const senha = 'senha123'; // A senha que você quer criptografar
const hashedPassword = bcrypt.hashSync(senha, 10); // Gera o hash com custo 10

console.log(hashedPassword); // Exibe o hash gerado
