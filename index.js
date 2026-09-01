import chalk from 'chalk';
import { mensagem } from './aula.js';
 
mensagem('Sté')
 
console.log(chalk.red('Hello world!'));
 
 
 
 
export function mensagem(a) { // export é para permiter que outro arquivo dentro do projeto use essa construção
    console.log(`Bem-vindo a pizzaria ${a}`)
}
