const { StatusCodes } = require('http-status-codes');
const productService = require('../services/productService');

const createProduct = async (req, res, next) => {
  const { name, quantity } = req.body;
  const newProduct = await productService.createProduct(name, quantity);

  if (newProduct.error) return next(newProduct);

  res.status(StatusCodes.CREATED).json(newProduct);
};

const getAll = async (_req, res, _next) => {
  const allProducts = await productService.getAll();

  res.status(StatusCodes.OK).json(allProducts);
};

module.exports = {
  createProduct,
  getAll,
};

// const createProduct = async (req, res, next) => {
// const { name, quantity } = req.body;
// const
// };
