const productModel = require('../models/productModel');

const validateName = async (name) => {
  let message = null;

  if (name.length < 5) {
    message = '"name" length must be at least 5 characters long';
    return message;
  }
 
  if (await productModel.productExists(name)) {
    message = 'Product already exists';
    return message;
  }
  
  return message;
};

const createProduct = async ({ name, quantity }) => {
  const message = await validateName(name);
  if (message) {
   return {
    status: 422,
    messageResult: {
      err: {
        code: 'invalid_data',
        message, 
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
