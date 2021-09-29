const productService = require('../services/productsService');

const createNewProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;

  const errorMessage = await productService.validateProduct(name, quantity);
  if (errorMessage) return res.status(422).json({ err: { code: 'invalid_data', errorMessage } });

  const newProduct = await productService.createNewProduct(name, quantity);
  return res.status(201).json(newProduct);
};

module.exports = {
  createNewProduct,
};
