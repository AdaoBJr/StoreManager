const { createSales, update, findById, excluse } = require('../models/salesModel');
const { updateDelete } = require('../models/productModel');

const { errorBusiness } = require('../helpers/errors');

// const filterById = async (id) => {
//   const products = await getById(id);
//   if (!products) {
//     return errorBusiness('Wrong id format');
//   }

//   return products;
// };

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
//   getAll,
//   filterById,
  update,
  excludeService,
};
