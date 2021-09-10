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

// REQUISITO 3
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = req.body;
  const { status, updatedProduct } = await productsService.updateProduct(id, product);
  return res.status(status).json(updatedProduct);
};

// REQUISITO 4
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  const { status, deletedProduct } = await productsService.deleteProduct(id);
  return res.status(status).json(deletedProduct);
};

// -----------------------------------------------------------------------------------------------

module.exports = {
  createProduct,
  getProducts,
  updateProduct,
  deleteProduct,
};