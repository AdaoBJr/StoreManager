const { ObjectId } = require('mongodb');
const salesModel = require('../models/salesModel');

const quantityError = { err:
  { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };

const saleError = { err:
  { code: 'invalid_data', message: 'Sale not found' } };

  const wrongIdFormat = { err:
    { code: 'invalid_data', message: 'Wrong sale ID format' } };

const add = async (itensSold) => {
  const wrongFormat = itensSold.find((obj) => obj.quantity < 1 || typeof obj.quantity !== 'number');
    if (wrongFormat) return quantityError;
    return salesModel.add(itensSold);
};

const getById = async (id) => {
  const exists = await salesModel.saleExists(id);
  if (!exists) return Promise.reject(saleError);
  return salesModel.getById(id);
};

const update = async (productId, itensSold) => {
  const wrongFormat = itensSold.find((obj) => obj.quantity < 1 || typeof obj.quantity !== 'number');
    if (wrongFormat) return quantityError;
  return salesModel.update(productId, itensSold);
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return wrongIdFormat;
  const saleExists = await salesModel.getById(id);
  if (!saleExists) return wrongIdFormat;
  const modelR = await salesModel.remove(id);
  return modelR;
};

module.exports = { add, getById, update, remove };