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

module.exports = {
  create,
};