const Sales = require('../models/Sales');
const Product = require('../models/Products');
const Error = require('../configs/responseErrors');

const create = async (sales) => {
  const salesQuantity = sales[0].quantity;
  const storedQuantity = (await Product.findById(sales[0].productId)).quantity;

  if (salesQuantity > storedQuantity) {
    return Error.stockProblem('Such amount is not permitted to sell');
  }
  
  sales.forEach((sale) => { Product.ensuresQuantity(sale); });

  return Sales.create(sales);
};

const findById = async (id) => {
  const sale = await Sales.findById(id);

  if (!sale) return Error.notFound('Sale not found'); 

  return sale;
};

const remove = async (id) => {
  const sales = await Sales.remove(id);

  if (!sales) return Error.invalidData('Wrong sale ID format');
  
  sales.itensSold.forEach((products) => Product.updateQuantity(products));

  return sales;
};

module.exports = {
  create,
  findById,
  getAll: Sales.getAll,
  update: Sales.update,
  remove,
};