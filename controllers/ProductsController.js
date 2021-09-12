// Source: https://app.betrybe.com/course/back-end/nodejs-camada-de-servico-e-arquitetura-rest-e-restful/arquitetura-de-software-camada-de-controller-e-service/f8eeda7e-dd20-4a59-a0d9-3d4ec20729bc/conteudos/bd3d8143-f691-4f3b-ae29-40f6f469db8b/praticando/7e59b4b5-e629-41e3-8df4-7228a9b9581e?use_case=side_bar

const ProductsService = require('../services/ProductsService');

const postProducts = async (req, res) => {
  const { name, quantity } = req.body;

  const newProduct = await ProductsService.postProducts(name, quantity);

  if (!newProduct) {
    res.status(400).json({ message: 'Produto não cadastrado' });
  }
  res.status(201).json(newProduct);
};

module.exports = {
  postProducts,
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