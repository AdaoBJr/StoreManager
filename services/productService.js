const productModel = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
  if (name.length < 5) {
    return {
      status: 422,
      messageResult: {
        err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long', 
        },
      },
    };
  }

  const { ops } = await productModel.createProduct({ name, quantity });
  return {
    status: 201,
    messageResult: ops[0],
  };
};

module.exports = {
  createProduct,
};
