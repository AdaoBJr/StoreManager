const ProductsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const result = ProductsModel.create(name, quantity);
  return result;
};

const findByName = async (name) => {
  const verify = await ProductsModel.findByName(name);
  return verify;
};

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await ProductsModel.getById(id);
  return result;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
};
