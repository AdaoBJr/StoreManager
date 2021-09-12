const productsService = require('../services/productsService');
const { dictionary } = require('../services/productsService');

const addProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const { created } = dictionary().status;

  const newProduct = await productsService.addProduct(name, quantity);

  if (newProduct.err) return next(newProduct.err);

  res.status(created).json(newProduct);
};

const getAllProducts = async (_req, res) => {
  const { ok } = dictionary().status;

  const allProducts = await productsService.getAllProducts();

  res.status(ok).json(allProducts);
};

const getProductById = async (req, res, next) => {
  const { id } = req.params;
  const { ok } = dictionary().status;

  const product = await productsService.getProductById(id);

  if (product.err) return next(product.err);

  res.status(ok).json(product);
};

module.exports = { addProduct, getAllProducts, getProductById };
