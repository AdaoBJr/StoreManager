const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
const service = require('../services/productsService');

const getAll = rescue(async (_request, response) => {
  const products = await service.getAll();

  response.status(200).json(products);
});

const create = rescue(async (request, response) => {
  const { name, quantity } = request.body;

  const newProduct = await service.createProduct({ name, quantity });

  return response.status(StatusCodes.CREATED).json(newProduct);
});

module.exports = {
  create,
  getAll,
};
