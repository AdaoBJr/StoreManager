const Products = require('../models/Products');
const Error = require('../configs/responseErrors');

const create = async (product) => {
  const productExists = await Products.findByName(product.name);

  if (productExists) return Error.invalidData('Product already exists');

  return Products.create(product);
};

const findById = async (id) => {
  const product = await Products.findById(id);

  if (!product) return Error.invalidData('Wrong id format');
  
  return product;
};

module.exports = {
  create,
  findById,
  getAll: Products.getAll,
};
