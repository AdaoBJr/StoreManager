const { create } = require('../services/productService');

const createProduct = async (req, res, _next) => {
  const { name, quantity } = req.body;
  const { status, result } = await create(name, quantity);
  return res.status(status).json(result);
};

module.exports = {
  createProduct,
};
