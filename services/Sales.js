const Sales = require('../models/Sales');
const Product = require('../models/Products');
const Error = require('../utils/errosService');

const findById = async (id) => {
  const sale = await Sales.findById(id);
  if (!sale) return Error.notFound('Sale not found'); 
  return sale;
};

const create = async (sales) => {
  const resolve = await Promise.all(sales.map((s) => Product.checkQuantity(s)));
  const productsQuantities = resolve.every(((sale) => sale));
  if (!productsQuantities) return Error.stockProblem('Such amount is not permitted to sell');
  sales.forEach((sale) => { Product.updateQuantity(sale); });
  return Sales.create(sales);
};

const excluse = async (id) => {
  const sale = await Sales.findById(id);
  const saleResult = await Sales.excluse(id);
  if (!sale || !saleResult) return Error.invalidData('Wrong sale ID format');
  sale.itensSold.forEach((products) => Product.updateDelete(products));
  return saleResult;
};

module.exports = {
  getAll: Sales.getAll,
  update: Sales.update,
  create,
  findById,
  excluse,
};
