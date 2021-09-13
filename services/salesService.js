const salesModel = require('../models/salesModel');

const createSale = async (arr) => salesModel.createSale(arr);

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => salesModel.getSaleById(id);

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};