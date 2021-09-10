const { newProduct } = require('../models/productModel');

const create = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

module.exports = { create };
