const product = require('../models/products');
const Error = require('../utils/manageErrors');

const create = async (good) => {
  console.log('service');
  const checkproduct = await product.findProduct(good.name);
  if (checkproduct) return Error.conflict('Product already exists');
  return product.createProduct(good);
};

module.exports = {
  create,
};
