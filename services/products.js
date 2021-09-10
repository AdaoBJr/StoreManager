const ModelProducts = require('../models/products');

const getAll = async () => {
  const allProducts = await ModelProducts.getAll();
  return { products: [...allProducts] };
};

module.exports = {
  getAll,
};
