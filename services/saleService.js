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

module.exports = {
  createSale,
  getAll,
  findSaleById,
};