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

const updateById = async ({ saleId, itensSold }) => {
  const response = await salesModel.updateById({ saleId, itensSold });
  
  return response;
};

module.exports = { create, findAll, findById, updateById };