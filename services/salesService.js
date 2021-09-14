const salesModel = require('../models/salesModel');

const createSale = async (item) => {
  const err = { err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };
  const sale = await salesModel.addSale(item);
  
  const { quantity } = sale.itensSold[0];
  if (quantity <= 0 || typeof quantity !== 'number') return { err, error: true };
  return sale;
};

const findAllSales = async () => {
  const sales = await salesModel.findAll();
  return { sales };
};

const findId = async (id) => {
  const sale = await salesModel.findById(id);
  const err = { err: { code: 'not_found', message: 'Sale not found' }, error: true };

  if (!sale) return err;
  return sale;
};

const updateSale = async (id, item) => {
  const err = { 
    err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' }, 
    error: true,
  };
  const { quantity } = item[0];
  if (quantity <= 0 || typeof quantity !== 'number') return { err, error: true };
  const sale = await salesModel.updateSale(id, item);
  return sale;
};

const deleteSale = async (id) => {
  const sale = await salesModel.findById(id);
  const err = { err: { code: 'invalid_data', message: 'Wrong sale ID format' }, error: true };
  await salesModel.deleteById(id);

  if (!sale) return err;
  return sale;
};

module.exports = {
  createSale,
  findAllSales,
  findId,
  updateSale,
  deleteSale,
};