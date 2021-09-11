const ERROR_PROD_EXISTS = {
  status: 422,
  err: {
    code: 'invalid_data',
    message: 'Product already exists',
  },
};

const ERROR_NAME_LENGTH = {
  status: 422,
  err: {
    code: 'invalid_data',
    message: '"name" length must be at least 5 characters long',
  },
};

const ERROR_QTY_VALUE = {
  status: 422,
  err: {
    code: 'invalid_data',
    message: '"quantity" must be larger than or equal to 1',
  },
};

const ERROR_QTY_TYPE = {
  status: 422,
  err: {
    code: 'invalid_data',
    message: '"quantity" must be a number',
  },
};

const ERROR_ID_FORMAT = {
  status: 422,
  err: {
    code: 'invalid_data',
    message: 'Wrong id format',
  },
};

const ERROR_PROD_ID_OR_QTY = {
  status: 422,
  err: {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  },
};

const ERROR_SALE_NOT_FOUND = {
  status: 404,
  err: {
    code: 'not_found',
    message: 'Sale not found',
  },
};

const ERROR_SALE_ID_FORMAT = {
  status: 422,
  err: {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  },
};

const ERROR_LOW_STOCK = {
  status: 404,
  err: {
    code: 'stock_problem',
    message: 'Such amount is not permitted to sell',
  },
};

module.exports = {
  ERROR_PROD_EXISTS,
  ERROR_NAME_LENGTH,
  ERROR_QTY_VALUE,
  ERROR_QTY_TYPE,
  ERROR_ID_FORMAT,
  ERROR_PROD_ID_OR_QTY,
  ERROR_SALE_NOT_FOUND,
  ERROR_SALE_ID_FORMAT,
  ERROR_LOW_STOCK,
};
