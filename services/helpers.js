const { getByName } = require('../models/productModel');

const validName = (name) => {
  const minNameLength = 5;
  if (name.length < minNameLength) {
    return { 
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
      status: 422,
    };
  }
};

const alreadyExists = async (name) => {
  const result = await getByName(name);

  if (result) {
    return { err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
    status: 422 };
  }
};

const validQuantity = (quantity) => {
  if (quantity < 1) {
    return { err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
  status: 422 };
  }
};

const validNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    return { err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  status: 422 };
  }
};

module.exports = {
  alreadyExists,
  validName,
  validNumber,
  validQuantity,
};