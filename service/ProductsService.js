const ProductsModel = require('../models/ProductsModel');

const createProduct = async (name, quantity) => {
  const isHaveName = await ProductsModel.findByName(name);
  if (isHaveName) {
    return { err: {
      code: 'INVALID_DATA',
      message: 'Product already exists',
    } };
  }
 const newProduct = await ProductsModel.createProduct(name, quantity);
 return newProduct;
};

module.exports = {
  createProduct,
};