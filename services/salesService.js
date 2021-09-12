const { createSales } = require('../models/salesModel');
// const { checkSales } = require('../models/productModel');

// const { errorBusiness } = require('../helpers/errors');

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

// const excludeService = async (id) => {
//   const products = await exclude(id);
//   if (!products) return errorBusiness('Wrong id format');
//   return products;
// };

module.exports = {
  createServiceSales,
//   getAll,
//   filterById,
//   update,
//   excludeService,
};
