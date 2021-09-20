const { StatusCodes: { UNPROCESSABLE_ENTITY, NOT_FOUND } } = require('http-status-codes');
const { idValid, saleAlreadyExists } = require('../models/salesMdl');

const errors = {
  invalidQuantity: 'Wrong product ID or invalid quantity',
  notFound: 'Sale not found',
  invalidId: 'Wrong sale ID format',
};

const qtyValidator = (req, res, next) => {
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

const idValidator = async (req, res, next) => {
  const { id } = req.params;
  const result = await idValid(id);

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

const repeatValidator = async (req, res, next) => {
  const { id } = req.params;
  const result = await saleAlreadyExists(id);
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
  qtyValidator,
  idValidator,
  repeatValidator,
};
