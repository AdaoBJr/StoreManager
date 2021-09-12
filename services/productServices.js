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

const subtractProductsQuantity = async (entry) => {
  const { productId, quantity } = entry;
  const result = ProductsModel.subtractProductsQuantity(productId, quantity);
  return result;
};

const addProductsQuantity = async (entry) => {
  const { productId, quantity } = entry;
  const result = ProductsModel.addProductsQuantity(productId, quantity);
  return result;
};

module.exports = {
  addProductsQuantity,
  create,
  deleteById,
  findByName,
  getAll,
  getById,
  subtractProductsQuantity,
  updateById,
};
