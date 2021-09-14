const productsModel = require('../models/productsModel');

const error = {
    err: {
      code: 'invalid_data',
      message: null,
} };

const findProductByName = async (name) => {
  const product = await productsModel.findProductByName(name);
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const existsProduct = findProductByName(name);
  if (name.lenght < 6) {
    error.message = '"name" length must be at least 5 characters long';
    return error;
  }
  if (!existsProduct) {
    error.message = 'Product already exists';
    return error;
  }
  if (typeof quantity !== 'number') {
    error.message = '"quantity" must be a number';
    return error;
  }
  if (quantity < 1) {
    error.message = '"quantity" must be larger than or equal to 1';
    return error;
  }
  return productsModel.createProduct({ name, quantity });
};

module.exports = { createProduct };
