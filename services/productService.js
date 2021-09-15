const productModel = require('../models/productModel');

const validateName = (name) => {
  const result = {
    status: 422,
    messageResult: {
      err: {
        code: 'invalid_data',
        message: '', 
      },
    },
  };

  if (name.length < 5) {
    result.messageResult.err.message = '"name" length must be at least 5 characters long';
    return result;
  }

  if (productModel.productExists) {
    result.messageResult.err.message = 'Product already exists';
    return result;
  }
  
  return null;
};

const createProduct = async ({ name, quantity }) => {
  const result = validateName(name);
  if (result) {
    return result;
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
