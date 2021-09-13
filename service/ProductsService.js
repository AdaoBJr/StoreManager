const ProductsModel = require('../models/ProductsModel');

const createProduct = async (name, quantity) => {
  await ProductsModel.createProduct(name, quantity);
 return {
   name, quantity,
 };
};

module.exports = {
  createProduct,
};