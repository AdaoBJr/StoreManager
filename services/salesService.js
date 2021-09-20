const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const quantityError = { err:
  { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };

const saleError = { err:
  { code: 'invalid_data', message: 'Sale not found' } };

const add = async (itensSold) => {
  const wrongFormat = itensSold.find((obj) => obj.quantity < 1 || typeof obj.quantity !== 'number');
    if (wrongFormat) return quantityError;
    return salesModel.add(itensSold);
};

const getById = async (id) => {
  const exists = await salesModel.saleExists(id);
  if (!exists) return saleError;
  return salesModel.getById(id);
};

const update = async (productId, itensSold) => {
  const wrongFormat = itensSold.find((obj) => obj.quantity < 1 || typeof obj.quantity !== 'number');
    if (wrongFormat) return quantityError;
  return salesModel.update(productId, itensSold);
};

const remove = async (id) => {
  const deleteSale = await salesModel.remove(id);
  return deleteSale;
};

const verifyIdDelete = async (id) => {
  const getId = salesModel.getById(id);
  if (!ObjectId.isValid(id)) return null;
  return getId;
};

module.exports = { add, getById, update, remove, verifyIdDelete };