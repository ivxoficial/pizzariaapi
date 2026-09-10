import db from '../db/db.js';
import bcrypt from 'bcrypt';

// Lembrando que db é uma variável que recebeu os poderes da biblioteca mysql2 que conecta o node a um banco de dados

// exportar a função findAll pois clienteService é apenas um arquivo especializado que vai fornecer a especialidade dele para outros arquivos
export const findAll = async (cpf, email, nome) => {
    // 1. Define a consulta SQL base (listar todos os clientes)
    // Se ele não passar cpf email e nome vai mostrar todos
    let sql = 'SELECT * FROM usuario';
    // 2. Crie um vetor/array para as condições WHERE
    const conditions = [];
    // 3. Crie um vetor/array para os valores (para impedir SQL Injection)
    const values = [];
    // Adicionando o filtro de cpf
    if (cpf){
        conditions.push('cpf = ?'); // Não se coloca direto o valor ${cpf} na condição
        values.push(cpf); // Lá na frente '?' será substituído pelo valor inserido em cpf
    }
    // Adicionando o filtro de nome
    if (nome){
        conditions.push('LOWER(nome) LIKE ?')
        values.push(`%${nome.toLowerCase()}%`) // Vale lembrar que a % é comando SQL que indica que há mais coisas escritas, se nome = s; %s% pode ser igual a sabrina ou lucas
    }
    // Adicionando o filtro de email
    if (email){
        conditions.push('email = ?');
        values.push(email);
    }

    // 5. Se houver condições, anexa elas à consulta SQL
    if (conditions.length > 0){ //Se há alguma condição
        sql += ' WHERE ' + conditions.join(' AND ');
    };
    // Até aqui tudo virá com ?
    // sql = SELECT * FROM usuario + WHERE nome = ? AND email = ?
    const [rows] = await db.query(sql, values); // query é uma função que pegará sql como o primeiro parâmetro e values como segundo. Ela troca tudo que é ? e troca pelo índice correspondente do vetor values
    return rows; //Retorna um vetor que será o comando do MySQL
}

export const create = async (usuarioData) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(usuarioData.senha, saltRounds);

    const newUsuario = {
        ...usuarioData,
        senha: hashedPassword,
    };

    await db.query('INSERT INTO usuario SET ?', newUsuario);

    delete newUsuario.senha;
    return newUsuario;
}
export const update = async (cpf, clienteData) => {
    if (clienteData.senho) {
        const saltRounds = 10;
        clienteData.senha = await bcrypt.hash(clienteData.senha, saltRounds);
    }
    const [result] = await db.query('UPDATE usuario SET ? WHERE cpf = ?' , [clienteData, cpf]);
    return result.affectedRows > 0;
};

export const remove = async (cpf) => {
    const [result] = await db.query('DELETE FROM cliente WHERE cpf = ?' , [cpf]);
    return result.affectedRows > 0;
};


