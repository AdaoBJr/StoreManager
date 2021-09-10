const productsService = require('../services/productsService');

// ----------------------------------------------------------------------------------------------

// REQUISITO 1
const createProduct = async (req, res) => {
  const product = req.body;
  const { status, createdProduct } = await productsService.createProduct(product);
  res.status(status).json(createdProduct);
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createProduct,
};