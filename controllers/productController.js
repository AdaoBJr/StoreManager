const StatusCodes = require('http-status-codes');
const productService = require('../services/productService');

// req 1
const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const { _id, message, code } = await productService.createProductValidation(name, quantity);
  
  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { message, code } });
  }
  return res.status(StatusCodes.CREATED).json({ _id, name, quantity });
};

// req 2
const findProductById = async (req, res) => {
  const { id } = req.params;
  const productById = await productService.findProductByIdValidation(id);
  const { code, message } = productById;
  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  return res.status(StatusCodes.OK).json(productById);
};

// req 2
const findAllProducts = async (_req, res) => {
  const productsList = await productService.findAllProductsValidation();
  return res.status(StatusCodes.OK).json({ products: productsList });
};

// req 3
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;

  const productUpdate = await productService.updateProductValidation({ id, name, quantity });
  const { _id, message, code } = productUpdate;
  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  return res.status(StatusCodes.OK).json({ _id, name, quantity });
};

// req 4
const delProduct = async (req, res) => {
  const { id } = req.params;
  const toBeDeleted = await productService.delProductValidation(id);
  const { code, message } = toBeDeleted;

  if (message) {
    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({ err: { code, message } });
  }
  return res.status(StatusCodes.OK).json(toBeDeleted);
};

module.exports = {
  createProduct,
  findProductById,
  findAllProducts,
  updateProduct,
  delProduct,
};
