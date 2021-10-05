const salesModel = require('../models/sales');
const salesService = require('../services/sales');

const createSale = async (req, res) => {
  const sales = req.body;
  const newSale = await salesService.createSale(sales);
  if (newSale.wasAnError) return res.status(422).json(newSale);
  return res.status(200).json(newSale.ops[0]);
};

const getAllSales = async (req, res) => {
  res.json({ sales: await salesModel.getAllSales() });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const newSale = await salesModel.getSaleById(id);
  if (newSale.wasAnError) return res.status(404).json(newSale);
  return res.status(200).json({ newSale });
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};
