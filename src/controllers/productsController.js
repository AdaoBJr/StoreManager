const productsService = require('../services/productsService');
const { dictionary } = require('../../middlewares');

const registerProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { created } = dictionary().status;

  const newProduct = await productsService.registerProduct(name, quantity);

  if (newProduct.err) return next(newProduct.err);

  res.status(created).json(newProduct);
};

const listAllProducts = async (_req, res) => {
  const { ok } = dictionary().status;

  const allProducts = await productsService.listAllProducts();

  res.status(ok).json(allProducts);
};

module.exports = { registerProduct, listAllProducts };
