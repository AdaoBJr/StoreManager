const { add, productExists, getOne } = require('../models/productModel');

const createProduct = async ({ name, quantity }) => {
  const product = await productExists(name);

    if (product) return null;

  return add({ name, quantity });
};

const readProduct = async (id) => {
  const product = await getOne(id);
    if (!product) return null;
    
  return product;
};

module.exports = {
  createProduct,
  readProduct,
};