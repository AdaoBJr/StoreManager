const { StatusCodes } = require('http-status-codes');

const rescue = require('express-rescue');
const Service = require('../services/salesService');

const getAll = rescue(async (_request, response) => {
  const sales = await Service.getAll();
  response.status(StatusCodes.OK).json({ sales });
});

const create = rescue(async (request, response) => {
  const sales = await Service.create(request.body);
  return response.status(StatusCodes.OK).json(sales);
});

const getById = rescue(async (request, response) => {
  const { id } = request.params;
  const product = await Service.findId(id);
  response.status(StatusCodes.OK).json(product);
});

module.exports = {
  create,
  getAll,
  getById,
};
