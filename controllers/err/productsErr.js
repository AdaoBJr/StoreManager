const errNameLength = {
  err: {
    code: 'invalid_data', message: '"name" length must be at least 5 characters long',
  },
};

const errExists = {
  err: {
    code: 'invalid_data', message: 'Product already exists',
  },
};

const errQuantityLength = {
  err: {
    code: 'invalid_data', message: '"quantity" must be larger than or equal to 1',
  },
};

const errQuantityNotNumber = {
  err: {
    code: 'invalid_data', message: '"quantity" must be a number',
  },
};

const errWrongId = {
  err: {
    code: 'invalid_data', message: 'Wrong id format',
  },
};

module.exports = {
  errNameLength,
  errExists,
  errQuantityLength,
  errQuantityNotNumber,
  errWrongId,
};