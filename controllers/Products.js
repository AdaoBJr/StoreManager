const express = require('express');
const rescue = require('express-rescue');
const { productValidate } = require('../middlewares');
const Products = require('../services/Products');
const { CREATED, SUCCESS } = require('../utils/statusCode');

const products = express.Router();

products.get(
  '/',
  rescue(async (req, res) => {
    const listProducts = await Products.getAll();
    res.status(SUCCESS).json({ products: listProducts });
  }),
);

products.get(
  '/:id',
  rescue(async (req, res, next) => {
    const { id } = req.params;
    const product = await Products.findById(id);
    if (product.isError) return next(product);
    return res.status(SUCCESS).json(product);
  }),
);

products.post(
  '/',
  productValidate,
  rescue(async (req, res, next) => {
    const { name, quantity } = req.body;
    const product = await Products.create({ name, quantity });
    if (product.isError) return next(product);
    return res.status(CREATED).json(product);
  }),
);

module.exports = products;
