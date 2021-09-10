const productModel = require('../models/productModel');

const getAll = async () => productModel.getAll();

const findById = async (id) => {
    const product = await productModel.findById(id);
  
    if (!product) {
      return {
        err: {
          code: 'invalid_data',
          message: 'Wrong id format',
        },
      };
    }
  
    return product;
  };

const create = async (name, quantity) => {
    const existingProduct = await productModel.findByName(name);
  
    if (existingProduct) {
      return {
        err: {
          code: 'invalid_data',
          message: 'Product already exists',
        },
      };
    }
  
    return productModel.create(name, quantity);
  };

module.exports = { create, getAll, findById };
