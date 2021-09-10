const ProductsModel = require('../models/productsModel');

const findByName = async (name) => {
  const verify = await ProductsModel.findByName(name);
  return verify;
};

const create = async (name, quantity) => {
  const result = ProductsModel.create(name, quantity);
  return result;
};

module.exports = {
  create,
  findByName,
};
