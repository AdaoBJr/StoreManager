const { StatusCodes } = require('http-status-codes');
const rescue = require('express-rescue');
const Joi = require('joi');
const service = require('../services/productsService');

const getAll = rescue(async (_request, response) => {
  const products = await service.getAll();

  response.status(200).json(products);
});

const validName = rescue(async (request, response, next) => {
  const { name } = request.body;
  const { error } = Joi.string().min(5).required()
  .validate(name);

  if (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
});

const validQuantity = rescue(async (request, response, next) => {
  const { quantity } = request.body;
  const { error } = Joi.number().min(1).integer().required()
  .validate(quantity);

  if (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
});

const existsProduct = rescue(async (request, response, next) => {
  const { name } = request.body;
  const product = await service.verifyNameExistsProducts(name);

  if (product) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      error: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
});

const create = rescue(async (request, response) => {
  const { name, quantity } = request.body;

  const newProduct = await service.createProduct({ name, quantity });

  const { insertedId } = newProduct;

  return response.status(StatusCodes.CREATED).json({ _id: insertedId, name, quantity });
});

module.exports = {
  create,
  getAll,
  validName,
  validQuantity,
  existsProduct,
};
