const { StatusCodes } = require('http-status-codes');
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

module.exports = {
  findId,
};
