const rescue = require('express-rescue');

const SalesModel = require('../models/SalesModel');

const STATUS = {
  HTTP_CREATED: 201,
  HTTP_OK: 200,
};

const getAll = rescue(async (_request, response, next) => {
  const { sales, error } = await SalesModel.getAll();

  if (error) { return next(error); }

  return response.status(STATUS.HTTP_OK).json({ sales });
});

const getById = rescue(async (request, response, next) => {
  const { id } = request.params;

  const { sale, error } = await SalesModel.getById(id);

  if (error) { return next(error); }

  return response.status(STATUS.HTTP_OK).json(sale);
});

const create = rescue(async (request, response, _next) => {
  const { body } = request;

  const sale = await SalesModel.create(body);

  return response.status(STATUS.HTTP_OK).json(sale);
});

const update = rescue(async (request, response, next) => {
  const { id } = request.params;
  const { body } = request;

  const { result, error } = await SalesModel.update(id, body);

  if (error) { return next(error); }

  return response.status(STATUS.HTTP_OK).json(result);
});

module.exports = { getAll, getById, create, update };
