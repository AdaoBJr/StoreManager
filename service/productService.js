const productModel = require('../models/productModel');

const create = async (name, quantity) => {
    const existingProduct = await productModel.findByName(name);
  
    if (existingProduct) {
      return {
        error: {
          code: 'alreadyExists',
          message: 'Product already exists',
        },
      };
    }
  
    return productModel.create(name, quantity);
  };

module.exports = { create };
