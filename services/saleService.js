const SalesModel = require('../models/saleModel');

const numberOfQuantity = (quantity) => {
  if (quantity <= 0 || typeof quantity !== 'number') return false;
  
  return true;
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

const createSale = async (sale) => {
  const [{ quantity }] = sale;
  const numberQuantity = numberOfQuantity(quantity);

  if (!numberQuantity) return false;

  return SalesModel.create(sale);
};

const updateSale = async (id, sale) => {
  const [{ quantity }] = sale;
  const numberQuantity = numberOfQuantity(quantity);

  if (!numberQuantity) return false;

  return SalesModel.update(id, sale);
};

const excludeSale = async (id) => {
  const exclude = await SalesModel.exclude(id);

  if (!exclude) return null;

  return exclude;
};

module.exports = {
  numberOfQuantity,
  createSale,
  getAllSales,
  getById,
  updateSale,
  excludeSale,
};