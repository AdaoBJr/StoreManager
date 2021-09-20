const {
  invalidName,
  invalidQuantity,
  invalidQuantityType,
  invalidIdFormat,
  alreadyExists,
  } = require('../../errors/errors');

const validateNameLength = (name) => {
  if (name.length < 5 || typeof name !== 'string') {
    const error = new Error();
    error.err = {
      code: invalidName.code,
      message: invalidName.message,
    };
    throw error;
  }
};

const validateQuantity = (quantity) => {
  if (quantity < 1 || quantity === '') {
    const error = new Error();
    error.err = {
      code: invalidQuantity.code,
      message: invalidQuantity.message,
    };
    throw error;
  }

  if (typeof quantity !== 'number') {
    const error = new Error();
    error.err = {
      code: invalidQuantityType.code,
      message: invalidQuantityType.message,
    };
    throw error;
  }
};

const validateProductId = (productId) => {
  if (!productId) {
    const error = new Error();
    error.err = {
      code: invalidIdFormat.code,
      message: invalidIdFormat.message,
    };
    throw error;
  }
};

const validateProductByName = async (name, callback) => {
  const product = await callback(name);
  if (product) {
    const error = new Error();
    error.err = {
      code: alreadyExists.code,
      message: alreadyExists.message,
    };
    throw error;
  }
};

module.exports = {
  validateNameLength,
  validateQuantity,
  validateProductId,
  validateProductByName,
};
