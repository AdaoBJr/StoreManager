const joi = require('joi');
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const createProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  
  const { error: joiError } = joi.object({
    name: joi
      .string().min(5).not().empty()
      .required(),
    quantity: joi
      .number().min(1).positive().not()
      .empty()
      .required(),
  }).validate(req.body);

  if (joiError) return next(joiError);
  
  const newProduct = await productsService.createProduct(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct); // Status 201 - Created
});

const getAllProducts = rescue(async (req, res, next) => {
  const allProducts = await productsService.getAllProducts();
  if (allProducts.error) return next(allProducts.error);

  return res.status(200).json(allProducts); // Status 200 - Ok/Success
});

module.exports = {
  createProduct,
  getAllProducts,
};