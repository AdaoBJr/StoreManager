const rescue = require('express-rescue');
const Joi = require('joi');
const CustomError = require('../helpers/CustomError');
const productsServer = require('../services/productsService');

const isValidNewProduct = (body) => {
  const { error } = Joi.object({
    name: Joi.string().min(5).not().empty()
      .required(),
    quantity: Joi.number().min(1).not().empty(),
  }).validate(body);

  if (error) {
    throw new CustomError('invalid_data', error.details[0].message, 422);
  }
};

const create = rescue(async (req, res) => {
  isValidNewProduct(req.body);
  
  const { name, quantity } = req.body;
  const response = await productsServer.create({ name, quantity });

  res.status(201).json(response);
});

const findAll = rescue(async (req, res, _next) => {
  const products = await productsServer.findAll();

  res.status(200).json({ products });
});

const findById = rescue(async (req, res) => {
  const { id } = req.params;

  const { error } = Joi.object({ 
    id: Joi
      .string()
      .hex()
      .length(24)
      .not()
      .empty()
      .required(),
  }).validate(req.params);

  if (error) {
    throw new CustomError('invalid_data', 'Wrong id format', 422);
  } 

  const product = await productsServer.findById({ id });

  res.status(200).json({ ...product });
});

module.exports = { create, findAll, findById };