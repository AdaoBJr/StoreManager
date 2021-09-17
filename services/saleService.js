const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');

const getAllService = async () => {
  const allSales = await saleModel.getAll();
  return allSales;
};

const getByIdService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const getIdSale = await saleModel.getById({ id });
  if (!getIdSale) {
    return false;
  }
  return getIdSale;
};

const createService = async ({ itensSold }) => {
  console.log(itensSold, 'service');
  const sale = await saleModel.create(itensSold);
  return sale;
};

module.exports = {
  getAllService,
  getByIdService,
  createService,
};
