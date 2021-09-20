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
  const sale = await saleModel.create(itensSold);
  return sale;
};

const updateService = async (id, sale) => {
  const updatedSale = await saleModel.update(id, sale);
  return updatedSale;
};

const deleteService = async (id) => {
  if (!ObjectId.isValid(id)) {
    return false;
  }
  const deletedSale = await saleModel.deleteSale(id);
  if (!deletedSale) {
    return false;
  }
  return deletedSale;
};

module.exports = {
  getAllService,
  getByIdService,
  createService,
  updateService,
  deleteService,
};
