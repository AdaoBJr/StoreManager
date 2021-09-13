const salesModel = require('../models/salesModel');

const createSale = async (item) => {
  const err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  const sale = await salesModel.addSale(item);
  
  const { quantity } = sale.itensSold[0];
  if (quantity <= 0 || typeof quantity !== 'number') return { err, error: true };
  return sale;
};

module.exports = {
  createSale,
};