const { getByName } = require('../models/productModel');

const validName = (name) => {
  const minNameLength = 5;
  if (name.length < minNameLength) {
    return { status: 422,
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    };
  }
};

const alreadyExists = async (name) => {
  const result = await getByName(name);

  if (result) {
    return { status: 422,
      err: {
      code: 'invalid_data',
      message: 'Product already exists',
    },
   };
  }
};

const validQuantity = (quantity) => {
  if (quantity < 1) {
    return { status: 422,
       err: {
      code: 'invalid_data',
      message: '"quantity" must be larger than or equal to 1',
    },
   };
  }
};

const validNumber = (quantity) => {
  if (typeof quantity !== 'number') {
    return { status: 422, 
      err: {
      code: 'invalid_data',
      message: '"quantity" must be a number',
    },
  };
  }
};

module.exports = {
  alreadyExists,
  validName,
  validNumber,
  validQuantity,
};