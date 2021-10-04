const productsModel = require('../models/productsModel');

const validateNameLength = (name) => {
    if (name.length < 5) {
        return '"name" length must be at least 5 characters long';
    }
    return null;
};

const validateNameExists = async (name) => {
    const productExists = await productsModel.productExists(name);
    if (productExists) {
      return 'Product already exists';
    }
    return null;
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

  const messageResult = await productsModel.createProduct({ name, quantity });
  return {
    status: 201,
    messageResult,
  };
};

const getAllProducts = () => {
    const products = productsModel.getAllProducts();

    return {
        status: 200,
        messageResult: {
            products,
        },
    };
};

const getProductById = async (id) => {
    const product = await productsModel.findById(id);
  
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
    const message = validateNameLength(name) || validateQuantity(quantity);
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
    const messageResult = await productsModel.updateProduct({ id, name, quantity });
    if (messageResult) {
      return { 
        status: 200, 
        messageResult };
    }
  };

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
};
