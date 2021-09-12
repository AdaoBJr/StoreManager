const SalesModel = require('../models/saleModel');

const numberOfQuantity = (quantity) => {
  if (quantity <= 0 || typeof quantity !== 'number') return false;
  
  return true;
};

const createSale = (sale) => {
  const [{ quantity }] = sale;
  const numberQuantity = numberOfQuantity(quantity);

  if (!numberQuantity) return false;

  return SalesModel.create(sale);
};

module.exports = {
  numberOfQuantity,
  createSale,
};