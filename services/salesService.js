const { createSales, update, findById, excluse, getAll } = require('../models/salesModel');
const { updateQuantity, updateDelete, checkQuantity } = require('../models/productModel');

const { errorBusiness, notFound, stockProblem } = require('../errors/errors');

const getById = async (id) => {
  const sale = await findById(id);
  if (!sale) return notFound('Sale not found'); 
  return sale;
};

const createServiceSales = async (sales) => {
  const resolve = await Promise.all(sales.map((s) => checkQuantity(s)));
  const productsQuantities = resolve.every(((sale) => sale));
  if (!productsQuantities) return stockProblem('Such amount is not permitted to sell');
  sales.forEach((sale) => { updateQuantity(sale); });
  return createSales(sales);
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
