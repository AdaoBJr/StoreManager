const products = require('../models/products');

const getAll = async () => products.getAll();

const createProduct = async (name, quantity) => {
  const newProducts = await products.create(name, quantity);
  return newProducts;
};

const verifyNameExistsProducts = async (name) => {
  const product = await products.findName(name);

  if (product) {
    return true;
  }
  return false;
};

module.exports = {
  createProduct,
  getAll,
  verifyNameExistsProducts,
};
