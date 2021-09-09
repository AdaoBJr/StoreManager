const { newProduct } = require('../models/produtos.model');

const criar = async ({ name, quantity }) => {
  const newProducts = await newProduct({ name, quantity });
  return newProducts;
};

module.exports = { criar };
