// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const express = require('express');
const ProductsService = require('../services/ProductsService');
const validateName = require('../middleware/validName');

// Source: https://app.betrybe.com/course/back-end/introducao-ao-desenvolvimento-web-com-nodejs/express-middlewares/0ba5165f-5fda-4b6b-8de7-d2ccf5782c18/conteudos/e0470c45-ed25-49b8-9675-47bb00b17e42/router-middleware/457000ee-68cb-4489-a75c-9ec061aca1a2?use_case=side_bar
const productRouter = express.Router();

// ------------------------------------------------------------------
// Requisito 1: CONTROLLER responsável por receber a requisição de cadastro de produto, fazer chamada ao SERVICE, e depois retornar a resposta ao cliente

productRouter.post('/', validateName, async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.postProducts({ name, quantity });

  if (newProduct.isError) {
    return res.status(newProduct.code).json({ message: `${newProduct.message}` });
  }

  return res.status(201).json(newProduct);
});

// ------------------------------------------------------------------

module.exports = {
  productRouter,
};

// Exemplo para implementação de middleware de erro genérico posteriormente

// const create = rescue(async (req, res, next) => {

// const { firstName, middleName, lastName } = req.body;

// const newAuthor = await service.create(firstName, middleName, lastName);

// // Caso haja erro na criação do autor, iniciamos o fluxo de erro
// if (newAuthor.error) return next(newAuthor.error);

// // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
// // do novo autor
// return res.status(201).json(newAuthor);