const rescue = require('express-rescue');
const Joi = require('joi');
const productsServer = require('../services/productsService');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = Joi.object({
    name: Joi.string().min(5).not().empty()
      .required(),
    quantity: Joi.number().min(1).not().empty(),
  }).validate(req.body);

  if (error) return next(error);

  const response = await productsServer.create({ name, quantity });

  res.status(201).json(response);
});

const findAll = rescue(async (req, res, _next) => {
  const products = await productsServer.findAll();

  res.status(200).json({ products });
});

module.exports = {
  create, findAll,
};