const Sales = require('../models/Sales');
const Product = require('../models/Products');
const Error = require('../utils/errosService');

const create = async (sales) => {
  const resolve = await Promise.all(sales.map((s) => Product.checkQuantity(s)));
  const productsQuantities = resolve.every(((sale) => sale));
  if (!productsQuantities) return Error.stockProblem('Such amount is not permitted to sell');
  sales.forEach((sale) => { Product.updateQuantity(sale); });
  return Sales.create(sales);
};

const findById = async (id) => {
  const sale = await Sales.findById(id);
  if (!sale) return Error.notFound('Sale not found'); 
  return sale;
};

module.exports = {
  getAll: Sales.getAll,
  create,
  findById,
};
