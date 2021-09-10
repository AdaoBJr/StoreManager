const productsService = require('../services/productsService');

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const response = await productsService.createProduct(name, quantity);
  if (response.message) {
    return res.status(response.code)
    .json({ err: { code: 'invalid_data', message: response.message } });
  }
  return res.status(201).json(response);
};

const getAllProducts = async (_req, res) => {
  const allProducts = await productsService.getAllProducts();
    return res.status(200).json({ products: allProducts });
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (product.message) {
    return res.status(product.code)
    .json({ err: { code: 'invalid_data', message: product.message } });
  }
  return res.status(200).json(product);
};

module.exports = { 
  createProduct,
  getAllProducts,
  getProductById,
};