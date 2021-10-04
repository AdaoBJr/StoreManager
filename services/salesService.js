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
  console.log(result);

  return result;
};

module.exports = {
  create,
  getAll,
  getById,
};
