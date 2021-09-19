const Products = require('../models/Products');
const Error = require('../configs/responseErrors');

const create = async (product) => {
  const productExists = await Products.findByName(product.name);

  if (productExists) return Error.invalidData('Product already exists');

  return Products.create(product);
};

module.exports = {
  create,
};
