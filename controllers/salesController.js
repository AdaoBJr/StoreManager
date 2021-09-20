const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');

const createSale = async (req, res) => {
  const sales = req.body;
  const postSales = await salesService.createSale(sales);
  if (postSales.err) return res.status(422).json(postSales);
  return res.status(200).json(postSales);
};

const getAllSales = async (req, res) => {
  const sales = await salesModel.getAllSales();
  if (sales.err) {
    return res.status(422).json(sales);
  }
  return res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.verifyExistenceId(id);
  if (sales.err) {
    return res.status(404).json(sales);
  }
  return res.status(200).json(sales);
};

module.exports = {
  createSale,
  getAllSales,
  getSalesById,
};