const productsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct(name, quantity);
  if (product.err) return res.status(422).json(product);
  return res.status(201).json(product);
};

module.exports = {
  createProduct,
};