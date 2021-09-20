const errSale = {
  err: {
    code: 'invalid_data', message: 'Wrong product ID or invalid quantity',
  },
};

const errNotExists = {
  err: {
    code: 'not_found', message: 'Sale not found',
  },
};

const errNotExistsRemove = {
  err: {
    code: 'invalid_data', message: 'Wrong sale ID format',
  },
};

module.exports = {
  errSale,
  errNotExists,
  errNotExistsRemove,
};