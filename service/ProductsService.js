const ProductsModel = require('../models/ProductsModel');

const createProduct = async (name, quantity) => {
 const newProduct = await ProductsModel.createProduct(name, quantity);
 return newProduct;
};

module.exports = {
  createProduct,
};