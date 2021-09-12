const dictionary = {
  nameLengthValidation: '"name" length must be at least 5 characters long',
  quantityQuantityValidation: '"quantity" must be larger than or equal to 1',
  quantityTypeValidation: '"quantity" must be a number',
};

const validateNameLength = (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422)
      .json(
        { err:
          {
            message: dictionary.nameLengthValidation,
            code: 'invalid_data',
          },
        },
      );
}
  // ({ err: { code: 422, message: dictionary.nameLengthValidation } });
  next();
};

const validateQuantityType = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422)
      .json(
        { err:
          {
            message: dictionary.quantityTypeValidation,
            code: 'invalid_data',
          },
        },
      );
  }
  // ({ err: { code: 422, message: dictionary.nameLengthValidation } });
  next();
};

const validateQuantityQuantity = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422)
      .json(
        { err:
          {
            message: dictionary.quantityQuantityValidation,
            code: 'invalid_data',
          },
        },
      );
}
  // ({ err: { code: 422, message: dictionary.nameLengthValidation } });
  next();
};

module.exports = { validateNameLength, validateQuantityType, validateQuantityQuantity };
