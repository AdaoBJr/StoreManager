const SalesModel = require('../models/salesModel');

const create = async (productsArray) => {
  const result = await SalesModel.create(productsArray);
  return result;
};

const getAll = async () => {
  const result = await SalesModel.getAll();
  return result;
};

const getById = async (id) => {
  const result = await SalesModel.getById(id);
  return result;
};

const update = async (id, sale) => {
  const result = await SalesModel.update(id, sale);
  return result;
};

const deleteById = async (id) => {
  const result = await SalesModel.deleteById(id);
  return result;
};

module.exports = {
  create,
  deleteById,
  getAll,
  getById,
  update,
};
