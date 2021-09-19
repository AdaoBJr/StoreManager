const Sales = require('../models/Sales');
const Product = require('../models/Products');
const Error = require('../configs/responseErrors');

const create = async (sales) => {
  const resolve = await Promise.all(sales.map((sale) => Product.validateQuantity(sale)));
  const productsQuantity = resolve.every(((sale) => sale));

  if (!productsQuantity) return Error.unstorable('Such amount is not permitted to sell');

  sales.forEach((sale) => { Product.updateQuantity(sale); });

  return Sales.create(sales);
};

module.exports = {
  create,
};