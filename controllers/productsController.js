const rescue = require('express-rescue');
const Joi = require('joi');
const ProductsService = require('../services/productServices');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  }).validate(req.body);

  if (error) {
    return next(error);
  }

  const verify = await ProductsService.findByName(name);
  if (verify) {
    return res.status(409).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  }

  const newProduct = await ProductsService.create(name, quantity);
  if (newProduct.err) return next(newProduct.err);
  return res.status(201).json(newProduct);
});

module.exports = {
  create,
};
