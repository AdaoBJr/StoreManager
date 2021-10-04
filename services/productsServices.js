const productsModel = require('../models/productsModel');

const create = async (name, quantity) => {
  const result = productsModel.create(name, quantity);
  return result;
};

const findByName = async (name) => {
  const verify = await productsModel.findByName(name);
  return verify;
};

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  return result;
};

const updateById = async (id, name, quantity) => {
  const result = await productsModel.updateById(id, name, quantity);
  return result;
};

const deleteById = async (id) => {
  const deleted = await productsModel.deleteById(id);
  return deleted;
};

const subtractProductsQuantity = async (entry) => {
  const { productId, quantity } = entry;
  const result = productsModel.subtractProductsQuantity(productId, quantity);

  return result;
};

const addProductsQuantity = async (entry) => {
  const { productId, quantity } = entry;
  const result = productsModel.addProductsQuantity(productId, quantity);

  return result;
};

module.exports = {
  create,
  findByName,
  getAll,
  getById,
  updateById,
  deleteById,
  subtractProductsQuantity,
  addProductsQuantity,
};
