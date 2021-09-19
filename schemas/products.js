const modelsProduct = require('../models/products');
const MIN_NAME_LENGTH = 5;
const ID_SIZE = 24;

const isProductExists = async (name) => {
  const productExists = await modelsProduct.getByName(name);
  if (productExists) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: 'Product already exists',
      },
    };
  }
  return true;
};

const isQuantityValid = (quantity) => {
  if (quantity < 1) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: '"quantity" must be larger than or equal to 1',
      },
    };
  }
  if (typeof quantity !== 'number') {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: '"quantity" must be a number',
      },
    };
  }
  return true;
};

const isNameValid = (name) => {
  if (name.length < MIN_NAME_LENGTH) {
    return {
      code: 422,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
  return true;
};

const isIdValid = (id) => {
  if (id.length !== ID_SIZE) {
    return {
      code: 422,
      err: {
        code: 'invalid_data', message: 'Wrong id format',
      },
    };
  }
  return true;
};

module.exports = {
  isProductExists,
  isQuantityValid,
  isNameValid,
  isIdValid,
};
