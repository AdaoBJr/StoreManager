const Products = require('../models/Products');
const Error = require('../utils/errosService');

const create = async (product) => {
  const checkProduct = await Products.findByName(product.name);
  if (checkProduct) return Error.invalidData('Product already exists');
  return Products.create(product);
};

module.exports = {
  create,
};
