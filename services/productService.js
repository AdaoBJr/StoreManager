const productModel = require('../models/productModel');

const createProduct = async ({ name, quantity }) => productModel.createProduct({ name, quantity });

module.exports = {
  createProduct,
};
