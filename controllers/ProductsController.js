const rescue = require('express-rescue');
const Joi = require('joi');
const PrductsService = require('../service/ProductsService');

const createProduct = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().integer().min(1).required(),
  }).validate(req.body);
  if (error) {
    return next(error);
  }
  const { name, quantity } = req.body;
  const newProduct = await PrductsService.createProduct(name, quantity);
  res.status(201).json(newProduct);
});

module.exports = {
  createProduct,
};