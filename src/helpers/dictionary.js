const dictionary = () => ({
  messages: {
    nameLengthValidation: '"name" length must be at least 5 characters long',
    quantityAmountValidation: '"quantity" must be larger than or equal to 1',
    quantityTypeValidation: '"quantity" must be a number',
    alreadyExists: 'Product already exists',
    wrongID: 'Wrong id format',
    quantityTypeAndAmountValidation: 'Wrong product ID or invalid quantity',
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

module.exports = { dictionary };
