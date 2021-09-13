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

const getAllSales = async () => {
  const getSales = await SalesModel.getAll();

  return getSales;
};

const getById = async (id) => {
  const sale = await SalesModel.getById(id);

  if (!sale) return null;

  return sale;
};

module.exports = {
  numberOfQuantity,
  createSale,
  getAllSales,
  getById,
};