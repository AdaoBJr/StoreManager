const joi = require('joi');
const rescue = require('express-rescue');
const productsService = require('../services/productsService');

const createProduct = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  
  const { error: joiError } = joi.object({
    name: joi
      .string()
      .min(5)
      .not().empty()
      .required(),
    quantity: joi
      .number()
      .min(1)
      .positive()
      // eslint-disable-next-line newline-per-chained-call
      .not().empty()
      .required(),
  }).validate(req.body);

  if (joiError) return next(joiError);
  
  const newProduct = await productsService.createProduct(name, quantity);

  if (newProduct.error) return next(newProduct.error);

  return res.status(201).json(newProduct); // Status 201 - Created
});

module.exports = {
  createProduct,
};