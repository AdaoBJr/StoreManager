const salesModel = require('../models/salesModel');

const createSale = async (arr) => salesModel.createSale(arr);

const getAllSales = async () => salesModel.getAllSales();

const getSaleById = async (id) => salesModel.getSaleById(id);

const updateSaleById = async (id, arr) => salesModel.updateSaleById(id, arr);

const deleteSaleById = async (id) => salesModel.deleteSaleById(id);

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};