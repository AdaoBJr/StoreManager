const productsModel = require('../models/productsModel');

const createProduct = async (name, quantity) => {
  const result = await productsModel.createProduct(name, quantity);
  return result;
};

const findName = async (name) => {
  const result = await productsModel.findName(name);
  return result;
};

const getAll = async () => {
  const result = await productsModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await productsModel.getById(id);
  return result;
};

const updateProduct = async (name, quantity, id) => {
  const result = await productsModel.updateProduct(name, quantity, id);
  return result;
};

const deleteProduct = async (id) => {
  const deletedData = await productsModel.deleteProduct(id);
  return deletedData;
};

module.exports = {
  createProduct,
  findName,
  getAll,
  getById,
  updateProduct,
  deleteProduct,
};
