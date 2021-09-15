const rescue = require('express-rescue');
const produtoServices = require('../Services/produtoService');

const cadastrarProdutoController = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await produtoServices.cadastrarProdutoServices({ name, quantity });

  if ('err' in result) {
    return next(result);
  }

  return res.status(201).json(result);
});

const buscarTodosProdutoController = rescue(async (req, res, _next) => {
  const result = await produtoServices.buscarTodosProdutoServices();

  return res.status(200).json(result);
});

const buscarProdutoPorIDController = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await produtoServices.buscarProdutoPorIDServices(id);

  if ('err' in result) {
    return next(result);
  }

  return res.status(200).json(result);
});

module.exports = { 
cadastrarProdutoController,
buscarTodosProdutoController,
buscarProdutoPorIDController,
};