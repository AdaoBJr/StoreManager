const { StatusCodes: { UNPROCESSABLE_ENTITY, NOT_FOUND } } = require('http-status-codes');
const { isValidId, saleExists } = require('../models/salesModel');

const errors = {
  invalidQuantity: 'Wrong product ID or invalid quantity',
  notFound: 'Sale not found',
  invalidId: 'Wrong sale ID format',
};

const quantityValidations = (req, res, next) => {
  const isValid = req.body.every(({ quantity }) => typeof quantity === 'number' && quantity >= 1);

  if (!isValid) {
    return res.status(UNPROCESSABLE_ENTITY).json({
      err: {
        code: 'invalid_data',
        message: errors.invalidQuantity,
      },
    });
  }
  next();
};

const idValidation = async (req, res, next) => {
  const { id } = req.params;
  const result = await isValidId(id);

  if (!result && req.method === 'GET') {
    return res.status(NOT_FOUND).json({ err: {
        code: 'not_found',
        message: errors.notFound,
      },
    });
  }
  if (!result) {
    return res.status(UNPROCESSABLE_ENTITY).json({ err: {
        code: 'invalid_data',
        message: errors.invalidId,
      },
    });
  }
  next();
};

const existenceValidation = async (req, res, next) => {
  const { id } = req.params;
  const result = await saleExists(id);
  if (!result) {
    return res.status(NOT_FOUND).json({ err: {
        code: 'not_found',
        message: errors.notFound,
      },
    });
  }
  next();
};

module.exports = { 
  quantityValidations,
  idValidation,
  existenceValidation,
};