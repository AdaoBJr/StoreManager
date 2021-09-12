const productsService = require('../services/productsService');
const { dictionary } = require('../../middlewares');

const registerProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { created } = dictionary().status;

  const newProduct = await productsService.registerProduct(name, quantity);

  if (newProduct.err) return next(newProduct.err);

  res.status(created).json(newProduct);
};

module.exports = { registerProduct };
