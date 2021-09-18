const rescue = require('express-rescue');
const Products = require('../services/Products');
const modelProducts = require('../models/Products');

const create = rescue(async (req, res, _next) => {
  const { name, quantity } = req.body;
  const createProduct = await Products.create(name, quantity);
  const returnCreatedProduct = await modelProducts.findByName(name);
  // const verifyError = Object.prototype.hasOwnProperty.call(createProduct, 'err');

  if (typeof createProduct === 'object') return res.status(422).json(createProduct);

  return res.status(201).json(returnCreatedProduct);
});

const getAll = rescue(async (_req, res, _next) => {
  const products = await Products.getAll();

  return res.status(200).json({ products });
});

const findById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const product = await Products.findById(id);

  if (product.err) return res.status(422).json(product);

  return res.status(200).json(product);
});

module.exports = {
  create,
  getAll,
  findById,
};