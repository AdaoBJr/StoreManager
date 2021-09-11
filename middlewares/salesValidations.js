const { StatusCodes: { UNPROCESSABLE_ENTITY } } = require('http-status-codes');

const errors = {
  invalidQuantity: 'Wrong product ID or invalid quantity',
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

module.exports = { 
  quantityValidations,
};