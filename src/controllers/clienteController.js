// src/controllers/clienteController.js
// Usamos 'import * as' para agrupar todas as exportações do service.
import * as clienteService from '../services/clienteService.js';
import Joi from 'joi';

//Usando 'export const' para criar e exportar a função 
//Criação dos Schemas que o validate irá usar para validar dados do usuario 
export const clienteCreateSchema = Joi.object({
    cpf: Joi.string().required().length(11),
    nome: Joi.string().required().max(100),
    endereco: Joi.string().required().max(100),
    bairro: Joi.string().required().max(30),
    cidade: Joi.string().required().max(30),
    cep: Joi.string().required().max(8),
    telefone: Joi.string().required(),
    email: Joi.string().required().mail(),
    senha: Joi.string().required().min(6).max(100),
    tipo: Joi.string().required().max(10),
}).min(1);

export const listarClientes = async (req, res) => {
    try{
        //Capturamos os parâmentros de consulta da URL
        // ex: ?cpf=0123456789 / ?nome=ivan / ?email-ivan@senac.br
        const {cpf, nome, email } = req.query;
        //Passamos todos os filtros para o serviço
        const clientes = await clienteService.findAll(cpf, nome, email);
        //Lista vazia é uma resposta válida: 200 com [] 
        res.json(clientes);
    } catch (err) {
        console.error('Erro ao buscar clientes:', err);
        res.status(500).json({error: 'Erro interno do servidor'});
    }
};