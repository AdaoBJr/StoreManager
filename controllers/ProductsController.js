const rescue = require('express-rescue');

const ProductsModel = require('../models/ProductsModel');

const getAll = (rescue(async (_request, response, next) => {
  const { products, error } = await ProductsModel.getAll();

  if (error) {
    return next(error);
  }

  return response.status(200).json(products);
}));

const create = (rescue(async (request, response, _next) => {
  const { name, quantity } = request.body;

  const product = await ProductsModel.create(name, quantity);

  return response.status(201).json(product);
}));

module.exports = { getAll, create };
