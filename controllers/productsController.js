const rescue = require('express-rescue');

const {
  createProductService,
  getProductsAllService,
  getProductByIdService,
  updateProductByIdService,
  deleteProductByIdService,
} = require('../services/productsServices');

const createProductController = rescue(async (req, res) => {
  const product = req.body;
  const result = await createProductService(product);

  res.status(201).json(result);
});

const getProductsAllController = async (_req, res) => {
  const result = await getProductsAllService();

  res.status(200).json(result);
};

const getProductByIdController = rescue(async (req, res) => {
  const productId = req.params.id;
  const result = await getProductByIdService(productId);

  res.status(200).json(result);
});

const updateProductByIdController = rescue(async (req, res) => {
  const productId = req.params.id;
  const data = req.body;
  const result = await updateProductByIdService(productId, data);

  res.status(200).json(result);
});

const deleteProductByIdController = rescue(async (req, res) => {
  const productId = req.params.id;
  const result = await deleteProductByIdService(productId);

  res.status(200).json(result);
});

const createErrorProducts = (err, _req, _res, next) => {
  const newError = new Error();
  newError.code = 'invalid_data';
  newError.status = 422;
  newError.message = err.message;
  return next(newError);
};

const errorProducts = (err, _req, res, _next) => {
  res.status(`${err.status}`).json({ err: { code: err.code, message: err.message } });
};

module.exports = {
  createProductController,
  getProductsAllController,
  getProductByIdController,
  updateProductByIdController,
  deleteProductByIdController,
  createErrorProducts,
  errorProducts,
};
