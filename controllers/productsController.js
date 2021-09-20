const joi = require('joi');
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const joiValidationObject = {
  name: joi
    .string().min(5).not().empty()
    .required(),
  quantity: joi
    .number().min(1).positive().not()
    .empty()
    .required(),
};

const createProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  
  const { error: joiError } = joi.object(joiValidationObject).validate(req.body);
  if (joiError) return next(joiError);

  const newProduct = await productsService.createProduct(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct); // Status 201 - Created
});

const getAllProducts = rescue(async (_req, res, next) => {
  const allProducts = await productsService.getAllProducts();
  if (allProducts.error) return next(allProducts.error);

  return res.status(200).json(allProducts); // Status 200 - Ok/Success
});

const getProductById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (product.error) return next(product.error);

  return res.status(200).json(product);
});

const updateProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const { id } = req.params;
  
  const { error: joiError } = joi.object(joiValidationObject).validate(req.body);
  if (joiError) return next(joiError);

  const updatedProduct = await productsService.updateProduct(id, name, quantity);
  if (updatedProduct.error) return next(updatedProduct.error);

  return res.status(200).json(updatedProduct);
});

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};