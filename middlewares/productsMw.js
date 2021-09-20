const { StatusCodes: { UNPROCESSABLE_ENTITY } } = require('http-status-codes');
const { alreadyExists, idValid } = require('../models/productsMdl');

const errors = {
  nameLengthInvalid: '"name" length must be at least 5 characters long',
  isNotNumber: '"quantity" must be a number',
  quantLessThanOne: '"quantity" must be larger than or equal to 1',
  alreadyExists: 'Product already exists',
  invalidId: 'Wrong id format',
};

const MIN_NAME_LENGTH = 5;

const nameValidator = (req, res, next) => {
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

const qtyValidator = (req, res, next) => {
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

const repeatValidator = async (req, res, next) => {
  const { name } = req.body;
  const result = await alreadyExists(name);
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

const idValidator = async (req, res, next) => {
  const { id } = req.params;
  const result = await idValid(id);

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
  nameValidator,
  qtyValidator,
  repeatValidator,
  idValidator,
};