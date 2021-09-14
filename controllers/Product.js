const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/Product');

const getAll = rescue(async (_req, res) => {
  const products = await service.getAll();

  res.status(200).json(products);
});

const findById = rescue(async (req, res, next) => {
  // Extraímos o id da request
  const { id } = req.params;

  // Pedimos para o service buscar o produto
  const product = await service.findById(id);

  // Caso o service retorne um erro, interrompemos o processamento
  // e inicializamos o fluxo de erro
  if (product.error) return next(product.error);

  // Caso não haja nenhum erro, retornamos o product encontrado
  res.status(200).json(product);
});

const create = rescue(async (req, res, next) => {
  // Utilizamos o Joi para descrever o objeto que esperamos
  // receber na requisição. Para isso, chamamos Joi.object()
  // passando um objeto com os campos da requisição e suas descrições
  const { error } = Joi.object({
    // Deve ser uma string (.string()) não vazia (.not().empty()) e é obrigatório (.required())
    name: Joi.string().not().empty().required(),
    // Deve ser um inteiro não vazio e é obrigatório
    quantity: Joi.not().empty().required(),
  })
    // Por fim, pedimos que o Joi verifique se o corpo da requisição se adequa a essas regras
    .validate(req.body);

  // Caso exista algum problema com a validação, iniciamos o fluxo de erro e interrompemos o middleware.
  if (error) {
    return next(error);
  }

  // Caso não haja erro de validação, prosseguimos com a criação do usuário
  const { name, quantity } = req.body;

  const newProduct = await service.create(name, quantity);

  // Caso haja erro na criação do produto, iniciamos o fluxo de erro
  if (newProduct.error) return next(newProduct.error);

  // Caso esteja tudo certo, retornamos o status 201 Created, junto com as informações
  // do novo produto
  return res.status(201).json(newProduct);
});

const update = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    // Deve ser uma string (.string()) não vazia (.not().empty()) e é obrigatório (.required())
    name: Joi.string().not().empty().required(),
    // Deve ser um inteiro não vazio e é obrigatório
    quantity: Joi.not().empty().required(),
  })
    // Por fim, pedimos que o Joi verifique se o corpo da requisição se adequa a essas regras
    .validate(req.body);

  // Caso exista algum problema com a validação, iniciamos o fluxo de erro e interrompemos o middleware.
  if (error) {
    return next(error);
  }

  // Caso não haja erro de validação, prosseguimos com a atualização do produto
  const { id } = req.params;
  const { name, quantity } = req.body;

  const updatedProduct = await service.update(id, name, quantity);

  // Caso haja erro na atualização do produto, iniciamos o fluxo de erro
  if (updatedProduct.error) return next(updatedProduct.error);

  // Caso esteja tudo certo, retornamos o status 200 Updated, junto com as informações
  // do novo produto
  return res.status(200).json(updatedProduct);
});

const remove = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    // Deve ser uma string (.string()) não vazia (.not().empty()) e é obrigatório (.required())
    id: Joi.not().empty().required(),
  })
    // Por fim, pedimos que o Joi verifique se o corpo da requisição se adequa a essas regras
    .validate(req.params);

  // Caso exista algum problema com a validação, iniciamos o fluxo de erro e interrompemos o middleware.
  if (error) {
    return next(error);
  }

  // Caso não haja erro de validação, prosseguimos com a atualização do produto
  const { id } = req.params;

  const removedProduct = await service.remove(id);

  // Caso haja erro na atualização do produto, iniciamos o fluxo de erro
  if (removedProduct.error) return next(removedProduct.error);

  // Caso esteja tudo certo, retornamos o status 200 Updated, junto com as informações
  // do novo produto
  return res.status(200).json(removedProduct);
});

module.exports = {
  getAll,
  findById,
  create,
  update,
  remove,
};