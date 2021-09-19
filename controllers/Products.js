const express = require('express');
const rescue = require('express-rescue');

const Products = require('../services/Products');
const { productValidate } = require('../middlewares');
const { CREATED, SUCCESS } = require('../configs/statusCodes');

const products = express.Router();

products.post('/',
  productValidate,
  rescue(async (req, res, next) => {
  const { name, quantity } = req.body;
  const product = await Products.create({ name, quantity });

  if (product.isError) return next(product);

  return res.status(CREATED).json(product);
}));

products.get('/',
  rescue(async (_req, res) => {
  const listProducts = await Products.getAll();

  res.status(SUCCESS).json({ products: listProducts });
}));

products.get('/:id',
  rescue(async (req, res, next) => {
  const { id } = req.params;
  const product = await Products.findById(id);

  if (product.isError) return next(product);

  return res.status(SUCCESS).json(product);
}));

products.put('/:id',
  productValidate,
  rescue(async (req, res) => {
  const { id } = req.params;
  const product = await Products.update(id, req.body);
  return res.status(SUCCESS).json(product);
}));

module.exports = products;
