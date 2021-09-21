const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.createProduct(name, quantity);

  if (newProduct.error) return next(newProduct);

  res.status(StatusCodes.CREATED).json(newProduct);
};

const getAll = async (_req, res, _next) => {
  const all = await productService.getAll();

  res.status(StatusCodes.OK).json({ products: all });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const product = await productService.getById(id);

  if (product.error) return next(product);

  res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res, next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const updatedProduct = await productService.updateProduct(id, name, quantity);

  if (updatedProduct.error) return next(updatedProduct);

  res.status(StatusCodes.OK).json(updatedProduct);
};

const deleteProduct = async (req, res, next) => {
  const { id } = req.params;
  const productDeleted = await productService.deleteProduct(id);

  if (productDeleted.error) return next(productDeleted);

  res.status(StatusCodes.OK).json(productDeleted);
};

module.exports = {
  createProduct,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
