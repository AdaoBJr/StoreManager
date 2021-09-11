const {
  includeSales,
  getAllSales,
  findById,
  updateSale,
  removeSale,
} = require('../models/salesModel');

const include = async (sales) => includeSales(sales);

const getAll = async () => getAllSales();

const getById = async (id) => findById(id);

const update = async (id, sale) => updateSale(id, sale);

const remove = async (id) => removeSale(id);

module.exports = {
  include,
  getAll,
  getById,
  update,
  remove,
};