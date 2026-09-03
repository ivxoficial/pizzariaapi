
import 'dotenv/config';

import express from 'express';


import chalk from 'chalk';
// import { mensagem } from './aula.js';
import { pizzas } from './cardapiopizza.js';
// import { pedirpizza } from './fazerpizza.js';
 
// pizzas.forEach(element => {
//     console.log(`${element.id} - ${element.sabor} = ${chalk.red(element.preco)}`)    
// });
// pedirpizza()
// console.log(chalk.red('Hello world!'));
 
 
 
 
// export function mensagem(a) { // export é para permiter que outro arquivo dentro do projeto use essa construção
//    console.log(`Bem-vindo a pizzaria ${a}`)
// }
const app = express()


app.use(express.json())
app.get('/', (req, res) => {


    res.json({
        message :"Bem vindo à API da Pizzaria Senac!"
    });

});


// --- INICIALIZAÇÃO DO SERVIDOR ---
// 3. Define a porta em que o servidor vai "escutar" os pedidos
const PORTA = process.env.PORT

// 4. Manda o servidor ficar "escutando" na porta definida
app.listen(PORTA, () => {
    console.log(`Servidor rodando na porta ${PORTA}`)
});


// Rota para listar TODOS os Pizzas (seu código original)
app.get('/pizzas', (req, res) => {
    res.json(pizzas);
})

// Rota para listar uma Pizza (seu código id)
app
.get('/pizzas/:id', (req, res) =>{
    const id = parseInt(req.params.id);
    const pizza = pizzas.find(p => p.id === id);

    if (!pizza) {
        return res.status(404).json({ error: 'Pizza não encontrada'});
    }
    res.json(pizza);
})


