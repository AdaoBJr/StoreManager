const ProductsModel = require('../models/productsModel');

const findByName = async (name) => {
  const verify = await ProductsModel.findByName(name);
  return verify;
};

const create = async (name, quantity) => {
  const result = ProductsModel.create(name, quantity);
  return result;
};

const getAll = async () => {
  const result = await ProductsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await ProductsModel.getById(id);
  return result;
};

const updateById = async (id, name, quantity) => {
  const result = await ProductsModel.updateById(id, name, quantity);
  return result;
};

const deleteById = async (id) => {
  const deleted = await ProductsModel.deleteById(id);
  return deleted;
};

module.exports = {
  create,
  deleteById,
  findByName,
  getAll,
  getById,
  updateById,
};
