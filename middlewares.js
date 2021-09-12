const dictionary = () => ({
  messages: {
    nameLengthValidation: '"name" length must be at least 5 characters long',
    quantityAmountValidation: '"quantity" must be larger than or equal to 1',
    quantityTypeValidation: '"quantity" must be a number',
    alreadyExists: 'Product already exists',
  },
  status: {
    ok: 200,
    created: 201,
    unprocessableEntity: 422,
    internalServerError: 500,
  },
  code: {
    invalidData: 'invalid_data',
  },
});

const validateNameLength = (req, res, next) => {
  const { name } = req.body;
  const { unprocessableEntity } = dictionary().status;
  const { nameLengthValidation } = dictionary().messages;

  if (name.length < 5) {
    return res.status(unprocessableEntity)
      .json({ err: { message: nameLengthValidation, code: 'invalid_data' } });
  }

  next();
};

const validateQuantityType = (req, res, next) => {
  const { quantity } = req.body;
  const { unprocessableEntity } = dictionary().status;
  const { quantityTypeValidation } = dictionary().messages;

  if (typeof quantity !== 'number') {
    return res.status(unprocessableEntity)
      .json({ err: { message: quantityTypeValidation, code: 'invalid_data' } });
  }

  next();
};

const validateQuantityAmount = (req, res, next) => {
  const { quantity } = req.body;
  const { unprocessableEntity } = dictionary().status;
  const { quantityAmountValidation } = dictionary().messages;

  if (quantity <= 0) {
    return res.status(unprocessableEntity)
      .json({ err: { message: quantityAmountValidation, code: 'invalid_data' } });
  }

  next();
};

const errorMiddleware = (err, _req, res, _next) => {
  const { internalServerError } = dictionary().status;

  if (err.code && err.message) {
    return res.status(err.status).json({ err: { code: err.code, message: err.message } });
  }

  return res.status(internalServerError).json({ message: err.message });
};

module.exports = {
  validateNameLength, validateQuantityType, validateQuantityAmount, errorMiddleware, dictionary };
