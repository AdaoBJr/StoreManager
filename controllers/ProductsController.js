const rescue = require('express-rescue');

const ProductsModel = require('../models/ProductsModel');

const STATUS = {
  HTTP_CREATED: 201,
  HTTP_OK: 200,
};

const getAll = rescue(async (_request, response, next) => {
  const { products, error } = await ProductsModel.getAll();

  if (error) { return next(error); }

  return response.status(STATUS.HTTP_OK).json({ products });
});

const getById = rescue(async (request, response, next) => {
  const { id } = request.params;

  const { product, error } = await ProductsModel.getById(id);

  if (error) { return next(error); }

  return response.status(STATUS.HTTP_OK).json(product);
});

const create = rescue(async (request, response, _next) => {
  const { name, quantity } = request.body;

  const product = await ProductsModel.create(name, quantity);

  return response.status(STATUS.HTTP_CREATED).json(product);
});

const update = rescue(async (request, response, _next) => {
  const { id } = request.params;
  const { name, quantity } = request.body;

  const updatedProduct = await ProductsModel.update(id, name, quantity);

  return response.status(STATUS.HTTP_OK).json(updatedProduct);
});

const obliterate = rescue(async (request, response, next) => {
  const { id } = request.params;

  const { product, error } = await ProductsModel.obliterate(id);

  if (error) { return next(error); }

  return response.status(STATUS.HTTP_OK).json(product);
});

module.exports = { getAll, getById, create, update, obliterate };
