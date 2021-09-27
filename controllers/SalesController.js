const rescue = require('express-rescue');

const SalesModel = require('../models/SalesModel');

const STATUS = {
  HTTP_CREATED: 201,
  HTTP_OK: 200,
};

const create = rescue(async (request, response, _next) => {
  const { productId, quantity } = request.body;

  const newSale = await SalesModel.create(productId, quantity);

  return response.status(STATUS.HTTP_OK).json(newSale);
});

module.exports = { create };
