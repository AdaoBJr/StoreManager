const { StatusCodes } = require('http-status-codes');
const model = require('../models/productsModel');

const validateQuantity = async (quantity) => {
  if (quantity < 1) {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    };
  }

  if (typeof quantity !== 'number') {
    return {
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    };
  }

  return null;
};

const checkNameLength = async (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    const result = {
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
  }

  next();
};

const checkProductExist = async (req, res, next) => {
  const { name } = req.body;

  const product = await model.findProduct(name);
  if (product) {
    const result = {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };

    return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);
  }

  next();
};

const checkQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  const result = await validateQuantity(quantity);

  if (result) return res.status(StatusCodes.UNPROCESSABLE_ENTITY).json(result);

  next();
};

module.exports = {
  checkNameLength,
  checkProductExist,
  checkQuantity,
};
