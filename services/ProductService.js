const ProductModel = require('../models/ProductModel');

const create = async (name, quantity) => {
  const existingProduct = await ProductModel.findByName(name);

  if (existingProduct) {
    return {
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    };
  }

  return ProductModel.create(name, quantity);
};

const findAll = () => ProductModel.findAll();

const findById = async (id) => {
  const product = await ProductModel.findById(id);
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

module.exports = { create, findAll, findById };
