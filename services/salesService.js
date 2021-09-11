const { includeSales, getAllSales, findById } = require('../models/salesModel');

const include = async (sales) => includeSales(sales);
const getAll = async () => getAllSales();
const getById = async (id) => findById(id);

module.exports = {
  include,
  getAll,
  getById,
};