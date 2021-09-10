const ModelProducts = require('../models/products');

const getAll = async () => {
  const allProducts = await ModelProducts.getAll();
  return { products: [...allProducts] };
};

const getById = async (id) => {
  const product = await ModelProducts.getById(id);
  return product;
};

module.exports = {
  getAll,
  getById,
};
