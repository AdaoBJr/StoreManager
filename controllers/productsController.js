const productsService = require('../services/productsService');

const createProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const response = await productsService.createProduct(name, quantity);
  if (response.message) {
    return res.status(response.code)
    .json({ err: { code: 'invalid_data', message: response.message } });
  }
  return res.status(201).json(response);
};

module.exports = { createProduct };