const { createProduct } = require('../models/productsModel');

const createProducts = async ({ name, quantity }) => {
  const product = await createProduct({ name, quantity });
  return product; 
};

module.exports = { createProducts };
