const sale = require('../models/sales');
// const Error = require('../utils/manageErrors');

const create = async (itensSold) => sale.createSale(itensSold);

const getSales = async () => sale.getAllSales();

const getById = async (id) => sale.getSaleById(id);
const updateById = async (id, name, quantity) => sale.updateSale(id, name, quantity);

const deleteSaleById = async (id) => sale.deleteSale(id);

module.exports = {
  create,
  getSales,
  getById,
  updateById,
  deleteSaleById,
};
