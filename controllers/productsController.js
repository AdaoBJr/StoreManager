const rescue = require('express-rescue');
const Joi = require('joi');
const { ObjectID } = require('mongodb');

const ProductsService = require('../services/productsServices');

const create = rescue(async (req, res, next) => {
  const { name, quantity } = req.body;

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  }).validate(req.body);

  if (error) { return next(error); }

  const verify = await ProductsService.findByName(name);
  if (verify) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  }

  const newProduct = await ProductsService.create(name, quantity);
  if (newProduct.err) { return next(newProduct.err); }

  return res.status(201).json(newProduct);
});

const getAll = rescue(async (_req, res, _next) => {
  const products = await ProductsService.getAll();
  return res.status(200).json(products);
});

const getById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  if (!ObjectID.isValid(id)) {
    return res.status(422).json({ err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }

  const product = await ProductsService.getById(id);
  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return res.status(200).json(product);
});

const updateById = rescue(async (req, res, next) => {
  const { id } = req.params; const { name, quantity } = req.body;

  const { error } = Joi.object({
    name: Joi.string().min(5).required(),
    quantity: Joi.number().min(1).required(),
  }).validate(req.body);

  if (error) { return next(error); }
  const verify = await ProductsService.getById(id);

  if (!verify) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Product doesn\'t exist' },
    });
  }

  const updated = await ProductsService.updateById(id, name, quantity);
  if (!updated) return console.log(updated);

  return res.status(200).json({ _id: id, name, quantity });
});

module.exports = {
  create,
  getAll,
  getById,
  updateById,
};
