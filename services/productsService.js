const productsModel = require('../models/productsModel');

const error = {
    err: {
      code: 'invalid_data',
      message: null,
} };

const getProductByName = async (name) => {
  const product = await productsModel.getProductByName(name);
  return product;
};

const createProduct = async ({ name, quantity }) => {
  const existsProduct = await getProductByName(name);
  if (name.length < 6) {
    error.err.message = '"name" length must be at least 5 characters long';
    return error;
  }
  if (existsProduct.length > 0) {
    error.err.message = 'Product already exists';
    return error;
  }
  if (typeof quantity !== 'number') {
    error.err.message = '"quantity" must be a number';
    return error;
  }
  if (quantity < 1) {
    error.err.message = '"quantity" must be larger than or equal to 1';
    return error;
  }
  return productsModel.createProduct({ name, quantity });
};

const getAllProducts = async () => {
  const allProducts = { products: await productsModel.getAllProducts() };
  return allProducts;
};

module.exports = { createProduct, getAllProducts };
