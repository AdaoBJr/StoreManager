const productModel = require('../models/productModel');

const validateNameLength = (name) => {
  let message = null;

  if (name.length < 5) {
    message = '"name" length must be at least 5 characters long';
    return message;
  }
  
  return message;
};

const validateNameExists = async (name) => {
  let message = null;
 
  const productExists = await productModel.productExists(name);
  if (productExists) {
    message = 'Product already exists';
    return message;
  }
  
  return message;
};

const validateQuantity = (quantity) => {
  let message = null;

  if (typeof quantity !== 'number') {
    message = '"quantity" must be a number';
    return message;
  }

  if (quantity < 1) {
    message = '"quantity" must be larger than or equal to 1';
    return message;
  }

  return message;
};

const createProduct = async ({ name, quantity }) => {
  const message = validateNameLength(name) 
    || await validateNameExists(name) || validateQuantity(quantity);
  
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

  const messageResult = await productModel.createProduct({ name, quantity });
  return {
    status: 201,
    messageResult,
  };
};

const getAllProducts = async () => {
  const products = await productModel.getAllProducts();
  
  return {
    status: 200,
    messageResult: {
      products,
    },
  };
};

const getProductById = async (id) => {
  const product = await productModel.getProductById(id);

  if (!product) {
    return {
      status: 422,
      messageResult: {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format', 
        },
      },
    };
  }

  return {
    status: 200,
    messageResult: product,
  };
};

const updateProduct = async ({ id, name, quantity }) => {

};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
};
