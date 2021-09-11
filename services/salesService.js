const salesModel = require('../models/salesModel');

function isValidQuantity(sales) {
  const salesFiltered = sales.filter((sale) => sale.quantity <= 0);
  const salesFilteredByType = sales.filter((sale) => typeof sale.quantity !== 'number');
  
  if (salesFiltered.length !== 0 || salesFilteredByType.length !== 0) return false;

  return true;
}

async function create(sales) {
  const sale = await salesModel.create(sales);

  return sale;
}

async function getAll() {
  const sales = await salesModel.getAll();

  return sales;
}

async function getById(id) {
  const sale = await salesModel.getById(id);

  return sale;
}

module.exports = {
  isValidQuantity,
  create,
  getAll,
  getById,
};