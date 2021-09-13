const { ObjectId } = require('mongodb');

const validateId = (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return true;
};

const validateName = (name) => {
  const minLength = 5;
  if (!name || name.length < minLength) {
    return { err:
      {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    statusCode: 422,
    };
  }
  return null;
};

const validateQuantity = (quantity) => {
  const zero = 0;
  if (quantity === zero || quantity < zero) {
    return { err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    statusCode: 422,
    };
  }

  if (typeof quantity === 'string') {
    return { err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    statusCode: 422,
    };
  }
};

module.exports = {
  validateId,
  validateName,
  validateQuantity,
};
