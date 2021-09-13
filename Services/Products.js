const Products = require('../models/Products');

const createProduct = async (name, quantity) => {
  const product = await Products.productExists(name);

  if (product) return true;

  const newProduct = await Products.newProduct(name, quantity);

  return newProduct;
};

module.exports = {
  createProduct,
};
