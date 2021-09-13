const { StatusCodes } = require('http-status-codes');
const Joi = require('joi');
const productsModel = require('../models/products');

const productExists = async (request, response, next) => {
  const { name } = request.body;
  const existsProduct = await productsModel.findName({ name });

  if (existsProduct) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

const validName = async (request, response, next) => {
  const { name } = request.body;
  const { error } = Joi.string().min(5).required()
  .validate(name);

  if (error) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const validQuantity = async (request, response, next) => {
  const { quantity } = request.body;

  if (typeof quantity !== 'number') {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }

  if (quantity < 1) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};

const existsId = async (request, response, next) => {
  const { id } = request.params;
  const productId = await productsModel.findId(id);

  if (!productId) {
    return response.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  next();
};

module.exports = {
  productExists,
  validName,
  validQuantity,
  existsId,
};
