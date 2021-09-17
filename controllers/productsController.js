const productsService = require('../services/productsService');

const registerProducts = async (req, res) => {
  const { name, quantity } = req.body;
  const newProduct = await productsService.registerProducts(name, quantity);

  if (newProduct.err) {
    return res.status(422).json(newProduct);
  }

  return res.status(201).json(newProduct);
};

const getAllProducts = async (req, res) => {
  const allProducts = await productsService.getAllProducts();

  return res.status(200).json(allProducts);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);

  if (product.err) {
    return res.status(422).json(product);
  }

  return res.status(200).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const newProduct = await productsService.updateProduct(id, name, quantity);

  if (newProduct.err) {
    return res.status(422).json(newProduct);
  }

  return res.status(200).json({ id, name, quantity });
};

module.exports = {
  registerProducts,
  getAllProducts,
  getProductById,
  updateProduct,
};
