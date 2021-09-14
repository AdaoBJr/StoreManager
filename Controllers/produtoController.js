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

module.exports = { cadastrarProdutoController };