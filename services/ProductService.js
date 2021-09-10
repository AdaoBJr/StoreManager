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

module.exports = { create, findAll };
