const rescue = require('express-rescue');
const Joi = require('joi');
const ProductService = require('../services/ProductService');

const STATUS_CREATED = 201;
const NAME_MIN_LENGTH = 5;

const validateProduct = (body) => {
  const { error } = Joi.object({
    name: Joi.string().not().empty().min(NAME_MIN_LENGTH)
.required(),
    quantity: Joi.number().integer().min(1),
  }).validate(body);

  return error;
};

const create = rescue(async (req, res, next) => {
  const error = validateProduct(req.body);

  if (error) {
    return next(error);
  }

  const { name, quantity } = req.body;

  const productAdd = await ProductService.create(name, quantity);

  if (productAdd.err) return next(productAdd.err);

  return res.status(STATUS_CREATED).json(productAdd);
});

const update = rescue(async (req, res, next) => {
  const error = validateProduct(req.body);

  if (error) {
    return next(error);
  }

  const { name, quantity } = req.body;
  const { id } = req.params;

  const productUpdated = await ProductService.update(id, name, quantity);

  return res.status(200).json(productUpdated);
});

const findAll = rescue(async (_req, res, _next) => {
  const products = await ProductService.findAll();

  res.status(200).json({ products });
});

const findById = rescue(async (req, res, next) => {
  const { id } = req.params;

  const product = await ProductService.findById(id);

  if (product.err) return next(product.err);

  res.status(200).json(product);
});

module.exports = { create, update, findAll, findById };
