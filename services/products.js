const Products = require('../models/Products');
const Error = require('../utils/errosService');

const create = async (product) => {
  const checkProduct = await Products.findByName(product.name);
  if (checkProduct) return Error.invalidData('Product already exists');
  return Products.create(product);
};

const findById = async (id) => {
  const product = await Products.findById(id);
  if (!product) return Error.invalidData('Wrong id format');
  return product;
};

const excluse = async (id) => {
  const product = await Products.excluse(id);
  if (!product) return Error.invalidData('Wrong id format');
  return product;
};

module.exports = {
  getAll: Products.getAll,
  update: Products.update,
  create,
  findById,
  excluse,
};