const { add, productExists } = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
  const product = await productExists(name);

    if (product) return null;

  return add({ name, quantity });
};

module.exports = {
  createProduct,
};