/* const { ObjectId } = require('mongodb'); */
const salesModel = require('../models/salesModel');

const quantityError = { err:
  { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };

const saleError = { err:
  { code: 'invalid_data', message: 'Sale not found' } };

  const formatError = { err:
    { code: 'invalid_data', message: 'Wrong sale ID format' } };

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

const update = async ({ id, productId, quantity }) => {
  if (quantity < 1) return quantityError;
  if (typeof quantity !== 'number') return quantityError;
  return salesModel.update({ id, productId, quantity });
};

const remove = async (id) => {
  const exists = await salesModel.saleExists(id);
  if (!exists) return formatError;
  return salesModel.remove(id);
};

module.exports = { add, getById, update, remove };