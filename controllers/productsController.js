const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const getById = rescue(async (req, res, next) => {
  // Extraímos o id da request
  const { id } = req.params;

  // Pedimos para o service buscar o autor
  const product = await productsService.getById(id);

  // Caso o service retorne um erro, interrompemos o processamento
  // e inicializamos o fluxo de erro
  if (product.error) return next(product);

  // Caso não haja nenhum erro, retornamos o product encontrado
  res.status(200).json(product);
});

const getAll = rescue(async (_req, res, _next) => {
  const products = await productsService.getAll();

  res.status(200).json(products);
});

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  
  const newProduct = await productsService.create(name, quantity);
  // Caso haja erro na criação do autor, iniciamos o fluxo de erro
  if (newProduct.error) return next(newProduct);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  return res.status(201).json(newProduct);
});

const update = rescue(async (req, res, next) => {
  const { id } = req.params;
  
  const updatedProduct = await productsService.update(id);
  // Caso haja erro na criação do autor, iniciamos o fluxo de erro
  if (updatedProduct.error) return next(updatedProduct);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo Produto
  return res.status(200).json(updatedProduct);
});
module.exports = {
  getAll,
  getById,
  create,
  update,
};
