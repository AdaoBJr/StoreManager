// const { ObjectId } = require('mongodb');
const saleModel = require('../models/salesModel');

const wrongIdFormat = {
  err: { 
    code: 'invalid_data', 
    message: 'Wrong product ID or invalid quantity', 
  } };

const saleNotFound = {
  err: { 
    code: 'not_found', 
    message: 'Sale not found', 
  } };

const getSaleById = async (id) => {
  const verifySale = await saleModel.saleExists(id);
  if (!verifySale) return saleNotFound;
  return saleModel.saleById(id);
};

const createSale = (itensSold) => {
  const wrongFormat = itensSold
  .find((obj) => obj.productId.length < 5 || obj.quantity < 1 || typeof obj.quantity !== 'number');
  if (wrongFormat) return wrongIdFormat;
  return saleModel.create(itensSold);
};

module.exports = { getSaleById, createSale };
