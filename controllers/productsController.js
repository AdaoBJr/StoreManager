const productsService = require('../services/productsService');

const create = async (req, res) => {
  const { name, quantity } = req.body;
  
  const product = await productsService.createProduct(name, quantity);
  if (product.error) return res.status(422).json(product);
  return res.status(201).json(product);
};

module.exports = {
  create,
};