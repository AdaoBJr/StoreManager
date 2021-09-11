const { StatusCodes: { UNPROCESSABLE_ENTITY } } = require('http-status-codes');
const { productExists, isValidId } = require('../models/productsModel');

const errors = {
  nameLengthInvalid: '"name" length must be at least 5 characters long',
  isNotNumber: '"quantity" must be a number',
  quantLessThanOne: '"quantity" must be larger than or equal to 1',
  alreadyExists: 'Product already exists',
  invalidId: 'Wrong id format',
};

const MIN_NAME_LENGTH = 5;

const nameValidation = (req, res, next) => {
  const { name } = req.body;
  if (name.length <= MIN_NAME_LENGTH) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: errors.nameLengthInvalid,
      },
    });
  }
  next();
};

const quantityValidation = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: errors.isNotNumber,
      },
    });
  }

  if (quantity <= 0) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: errors.quantLessThanOne,
      },
    });
  }
  next();
};

const existenceValidation = async (req, res, next) => {
  const { name } = req.body;
  const result = await productExists(name);
  if (result) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: errors.alreadyExists,
      },
    });
  }
  next();
};

const idValidation = async (req, res, next) => {
  const { id } = req.params;
  const result = await isValidId(id);

  if (!result) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: errors.invalidId,
      },
    });
  }
  next();
};

module.exports = { 
  nameValidation,
  quantityValidation,
  existenceValidation,
  idValidation,
};