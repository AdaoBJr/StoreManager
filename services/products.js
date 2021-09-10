const ModelProducts = require('../models/products');

const getAll = async () => {
  const allProducts = await ModelProducts.getAll();
  return { products: [...allProducts] };
};

const getById = async (id) => {
  const product = await ModelProducts.getById(id);
  return product;
};

const getByName = async (name) => {
  const product = await ModelProducts.getByName(name);
  console.log(product);
  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
};
