const Sales = require('../models/Sales');
const Product = require('../models/Products');
const Error = require('../configs/responseErrors');

const create = async (sales) => {
  const resolve = await Promise.all(sales.map((sale) => Product.validateQuantity(sale)));
  const productsQuantity = resolve.every(((sale) => sale));

  if (!productsQuantity) return Error.unstorable('Such amount is not permitted to sell');

  sales.forEach((sale) => { Product.ensuresQuantity(sale); });

  return Sales.create(sales);
};

const findById = async (id) => {
  const sale = await Sales.findById(id);

  if (!sale) return Error.notFound('Sale not found'); 

  return sale;
};

const remove = async (id) => {
  const sale = await Sales.findById(id);
  const saleRemoved = await Sales.remove(id);

  if (!sale || !saleRemoved) return Error.invalidData('Wrong sale ID format');

  sale.itensSold.forEach((products) => Product.updateQuantity(products));

  return sale;
};

module.exports = {
  create,
  findById,
  getAll: Sales.getAll,
  update: Sales.update,
  remove,
};