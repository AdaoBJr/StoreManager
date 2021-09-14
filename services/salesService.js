const { ObjectId } = require('mongodb');
const saleModel = require('../models/salesModel');

const wrongIdFormat = {
  err: { 
    code: 'invalid_data', 
    message: 'Wrong product ID or invalid quantity', 
  } };

  // const saleNotFound = {
  //   err: { 
  //     code: 'invalid_data', 
  //     message: 'Sale not found', 
  //   } };

const getSaleById = (id) => {
  if (!ObjectId.isValid(id)) return wrongIdFormat;
  return saleModel.productById(id);
};

const createSale = (itensSold) => {
  const wrongFormat = itensSold
  .find((obj) => obj.productId.length < 5 || obj.quantity < 1 || typeof obj.quantity !== 'number');
  if (wrongFormat) return wrongIdFormat;
  return saleModel.create(itensSold);
};

module.exports = { getSaleById, createSale };
