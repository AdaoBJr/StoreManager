const productsService = require('../services/productsService');

// ----------------------------------------------------------------------------------------------

// REQUISITO 1
const createProduct = async (req, res) => {
  const product = req.body;
  const { status, createdProduct } = await productsService.createProduct(product);
  res.status(status).json(createdProduct);
};

// REQUISITO 2
const getProducts = async (req, res) => {
  const { id } = req.params;
  if (id) {
    const { status, product } = await productsService.getProducts(id);
    return res.status(status).json(product);
  }
  const { status, products } = await productsService.getProducts();
  return res.status(status).json(products);
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createProduct,
  getProducts,
};