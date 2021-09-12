const ProductsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { status, result } = await ProductsService.createProduct(name, quantity);
  return res.status(status).json(result);
};

module.exports = {
  createProduct,
};