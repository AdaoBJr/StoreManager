const { productExists, isValidId } = require('../models/productsModel');

const errors = {
  nameLengthInvalid: '"name" length must be at least 5 characters long',
  isNotNumber: '"quantity" must be a number',
  quantLessThanOne: '"quantity" must be larger than or equal to 1',
  alreadyExists: 'Product already exists',
  invalidId: 'Wrong id format',
};

const MIN_NAME_LENGTH = 5;

const nameValidation = (name) => {
  if (name.length <= MIN_NAME_LENGTH) {
    return ({
      err: {
        code: 'invalid_data',
        message: errors.nameLengthInvalid,
      },
    });
  }
  return {};
};

const quantityValidation = (quantity) => {
  if (typeof quantity !== 'number') {
    return ({
      err: {
        code: 'invalid_data',
        message: errors.isNotNumber,
      },
    });
  }

  if (quantity <= 0) {
    return ({
      err: {
        code: 'invalid_data',
        message: errors.quantLessThanOne,
      },
    });
  }
  return {};
};

const existenceValidation = async (name) => {
  const result = await productExists(name);
  if (result) {
    return ({
      err: {
        code: 'invalid_data',
        message: errors.alreadyExists,
      },
    });
  }
  return {};
};

const idValidation = async (id) => {
  const result = await isValidId(id);

  if (!result) {
    return ({
      err: {
        code: 'invalid_data',
        message: errors.invalidId,
      },
    });
  }
  return {};
};

module.exports = { 
  nameValidation,
  quantityValidation,
  existenceValidation,
  idValidation,
};