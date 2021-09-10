const { createNewProduct } = require('../models/products.model');

const createProduct = async ({ name, quantity }) => {
  const newProduct = await createNewProduct({ name, quantity });
  return newProduct;
};

module.exports = {
  createProduct,
};