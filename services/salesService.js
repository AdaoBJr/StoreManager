const CustomError = require('../helpers/CustomError');
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

const remove = async ({ id }) => {
  const sale = await salesModel.findById({ id });
  
  if (!sale) {
    throw new CustomError('not_found', 'Sale not found', 404);
  }

  await salesModel.remove({ id });
  return sale;
};

module.exports = { create, findAll, findById, updateById, remove };