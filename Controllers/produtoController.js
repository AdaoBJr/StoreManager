const rescue = require('express-rescue');
const produtoServices = require('../Services/produtoService');

const cadastrarProdutoController = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const result = await produtoServices.cadastrarProdutoServices(name, quantity);

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

const atualizarProdutoController = rescue(async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const result = await produtoServices.atualizarProdutoServices(id, name, quantity);

  if ('err' in result) {
    return next(result);
  }

  return res.status(200).json(result);
});

const deleteProdutoController = rescue(async (req, res, next) => {
  const { id } = req.params;
  const result = await produtoServices.deleteProdutoServices(id);

  if ('err' in result) {
    return next(result);
  }

  return res.status(200).json(result);
});

const cadastrarVendaController = rescue(async (req, res, next) => {
  const arrayVendas = req.body;
  const result = await produtoServices.cadastrarVendaServices(arrayVendas);

  if ('err' in result) {
    return next(result);
  }

  return res.status(200).json(result);
});

module.exports = { 
cadastrarProdutoController,
buscarTodosProdutoController,
buscarProdutoPorIDController,
atualizarProdutoController,
deleteProdutoController,
cadastrarVendaController,
};