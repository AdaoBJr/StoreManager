const products = require('../models/products');

const getAll = async () => {
  const productsAll = products.getAll();
  return productsAll;
};

const createProduct = async (product) => {
  const newProduct = products.create(product);
  return newProduct;
};

const findId = async (id) => {
  const product = await products.findId(id);
  return product;
};

module.exports = {
  createProduct,
  getAll,
  findId,
};
