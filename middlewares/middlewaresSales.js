const { StatusCodes } = require('http-status-codes');
const { ObjectId } = require('mongodb');

// const Joi = require('joi');
const SalesService = require('../services/salesService');

const findId = async (request, response, next) => {
  const { id } = request.params;
  const salesExists = await SalesService.findId(id);
  if (!salesExists) {
    return response.status(StatusCodes.NOT_FOUND).json({
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    });
  }

  next();
};

const validQuantity = async (request, response, next) => {
  const returnRequest = request.body;
  const quantity = returnRequest.every((value) => value.quantity > 0);

  if (!quantity) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

const validId = async (request, response, next) => {
  const { id } = request.params;

  if (!ObjectId.isValid(id)) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong sale ID format',
      },
    });
  }
  next();
};

module.exports = {
  findId,
  validQuantity,
  validId,
};
