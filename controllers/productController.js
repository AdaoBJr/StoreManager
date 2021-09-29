const productService = require('../services/productsService');

const createNewProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const message = await productService.validateProduct(name, quantity);
  if (message) return res.status(422).json({ err: { code: 'invalid_data', message } });

  const newProduct = await productService.createNewProduct(name, quantity);
  return res.status(201).json(newProduct);
};

module.exports = {
  createNewProduct,
};
