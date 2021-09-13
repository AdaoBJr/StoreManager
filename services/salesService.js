const salesModel = require('../models/salesModel');

const create = async (itensSold) => {
  const response = await salesModel.create(itensSold);

  return response;
};

const findAll = async () => {
  const sales = await salesModel.findAll();
  return sales;
};

const findById = async ({ id }) => {
  const sale = await salesModel.findById({ id });

  return sale;
};

module.exports = { create, findAll, findById };