const { createProduct } = require('./connection');

const createProducts = async ({ name, quantity }) => {
  const product = await createProduct({ name, quantity });
  return product; 
};

module.exports = { createProducts };
