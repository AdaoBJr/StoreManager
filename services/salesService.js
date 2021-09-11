const { includeSales, getAllSales, findById, updateSale } = require('../models/salesModel');

const include = async (sales) => includeSales(sales);

const getAll = async () => getAllSales();

const getById = async (id) => findById(id);

const update = async (id, sale) => updateSale(id, sale);

module.exports = {
  include,
  getAll,
  getById,
  update,
};