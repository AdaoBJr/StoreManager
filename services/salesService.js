const { ObjectId } = require('mongodb');
const saleModel = require('../models/salesModel');

const wrongIdFormat = {
  err: { 
    code: 'invalid_data', 
    message: 'Wrong product ID or invalid quantity', 
  } };

  const wrongSaleIdFormat = {
    err: { 
      code: 'invalid_data', 
      message: 'Wrong sale ID format', 
    } };

const createSale = (itensSold) => {
  const wrongFormat = itensSold
  .find((obj) => obj.productId.length < 5 || obj.quantity < 1 || typeof obj.quantity !== 'number');
  if (wrongFormat) return wrongIdFormat;
  return saleModel.create(itensSold);
};

const updateSaleService = async (id, [itensSold]) => {
  if (itensSold.productId.length < 5 
    || itensSold.quantity < 1 || typeof itensSold.quantity !== 'number') {
      return wrongIdFormat;
  }
  const update = await saleModel.update(id, itensSold);
  return update;
};

const deleteSale = async (id) => {
  if (!ObjectId.isValid(id)) return wrongSaleIdFormat;
  const saleExists = await saleModel.saleById(id);
  if (!saleExists) return wrongSaleIdFormat;
  const modelResult = await saleModel.exclude(id);
  return modelResult;
};

module.exports = { createSale, updateSaleService, deleteSale };
