const salesModel = require('../models/salesModel');

const createSale = async (sales) => {
  const create = await salesModel.create(sales);
  return create;
};

const getAll = async () => {
  const sales = await salesModel.getAll();
  return sales;
};

const findSaleById = async (id) => {
  const sale = await salesModel.getById(id);
  return sale;
};

const updateSale = async (id, sales) => {
  const update = await salesModel.update(id, sales);
  return update;
};

const deleteSale = async (id) => {
  const result = await salesModel.exclude(id);
  return result;
};

module.exports = {
  createSale,
  getAll,
  findSaleById,
  updateSale,
  deleteSale,
};