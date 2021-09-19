const express = require('express');
const rescue = require('express-rescue');

const Products = require('../services/Products');
const { CREATED } = require('../configs/statusCodes');
const { productValidate } = require('../middlewares');

const products = express.Router();

products.post('/',
  productValidate,
  rescue(async (req, res, next) => {
    const { name, quantity } = req.body;
    const product = await Products.create({ name, quantity });
    if (product.isError) return next(product);

    return res.status(CREATED).json(product);
  }));

module.exports = products;
