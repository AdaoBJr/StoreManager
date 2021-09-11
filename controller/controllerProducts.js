const Joi = require('joi');
const rescue = require('express-rescue');
const ServiceProduct = require('../service/serviceProducts');

const create = rescue(async (req, res, next) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty.require(),
    quantity: Joi.number().not().empty().required(),
  }).validate(req.body);
  
  const { name, quantity } = req.body;
  
  if (error) return next(error);

  const product = await ServiceProduct.create({ name, quantity });

  if (product.error) return next(product.error);

  return res.status(201).json(product);
});

module.exports = { create };
