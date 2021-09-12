const { createSales, update, findById, excluse, getAll } = require('../models/salesModel');
const { updateDelete } = require('../models/productModel');

const { errorBusiness, notFound } = require('../helpers/errors');

const getById = async (id) => {
  const sale = await findById(id);
  if (!sale) return notFound('Sale not found'); 
  return sale;
};

const createServiceSales = async (sales) => {
  const response = await createSales(sales);
  return response;
};

const excludeService = async (id) => {
  const sale = await findById(id);
  const saleResult = await excluse(id);
  if (!sale || !saleResult) return errorBusiness('Wrong sale ID format');
  sale.itensSold.forEach((products) => updateDelete(products));
  return saleResult;
};

module.exports = {
  createServiceSales,
  getAll,
//   filterById,
  getById,
  update,
  excludeService,
};
