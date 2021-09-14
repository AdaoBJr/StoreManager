const model = require('../models/sales');

function saleValidation(sale) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: 'Wrong product ID or invalid quantity',
  };
  sale.forEach((s) => {
    if (s.quantity < 1 || typeof s.quantity !== 'number') throw error;
  });
}

function salesExists(sale) {
  const error = new Error();
  error.status = 404;
  error.err = {
    code: 'not_found',
    message: 'Sale not found',
  };
  if (!sale) throw error;
}

function idValidation(sale) {
  const error = new Error();
  error.status = 422;
  error.err = {
    code: 'invalid_data',
    message: 'Wrong sale ID format',
  };
  if (!sale) throw error;
}

async function newSale(sale) {
  saleValidation(sale);
  const result = await model.newSale(sale);
  return result;
}

async function fetchSales() {
  const result = await model.fetchSales();
  return result;
}

async function findById(id) {
  const result = await model.findById(id);
  salesExists(result);
  return result;
}

async function updateSale(id, sale) {
  saleValidation(sale);
  const result = await model.updateSale(id, sale);
  return result;
}

async function deleteSale(id) {
  const result = await model.deleteSale(id);
  idValidation(result);
  return result;
}

module.exports = {
  newSale,
  fetchSales,
  findById,
  updateSale,
  deleteSale,
};
