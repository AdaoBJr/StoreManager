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

module.exports = {
  errSale,
  errNotExists,
};