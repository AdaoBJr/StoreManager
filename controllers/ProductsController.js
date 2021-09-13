const ProductsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const result = await ProductsService.createProduct(name, quantity);
  return res.status(201).json(result);
};

const getProductsAll = async (_req, res) => {
  const result = await ProductsService.getProductsAll();
  return res.status(200).json(result);
};

module.exports = {
  createProduct,
  getProductsAll,

};