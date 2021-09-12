const productsService = require('../services/productsService');

const registerProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.registerProduct(name, quantity);
  if (newProduct.err) return next(newProduct.err);
  res.status(201).json(newProduct);
};

module.exports = { registerProduct };
