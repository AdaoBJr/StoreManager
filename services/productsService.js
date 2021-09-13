const products = require('../models/products');

const getAll = async () => products.getAll();

const createProduct = async (product) => {
  const newProduct = products.create(product);
  return newProduct;
};

module.exports = {
  createProduct,
  getAll,
};
