const { createSales, update, findById, excluse, getAll } = require('../models/salesModel');
const { updateQuantity } = require('../models/productModel');

const { errorBusiness, notFound, stockProblem } = require('../helpers/errors');

const getById = async (id) => {
  const sale = await findById(id);
  if (!sale) return notFound('Sale not found'); 
  return sale;
};

const createServiceSales = async (sales) => {
  // source: consultei o repositorio do Henrique Clementino para realizar o desafio 10
  const resolve = await Promise.all(sales.map((s) => updateQuantity(s)));
  const productsQuantities = resolve.every(((sale) => sale));
  if (!productsQuantities) return stockProblem('Such amount is not permitted to sell');
  const response = await createSales(sales);
  return response;
};

const excludeService = async (id) => {
  const sale = await findById(id);
  const saleResult = await excluse(id);
  if (!sale || !saleResult) return errorBusiness('Wrong sale ID format');
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
