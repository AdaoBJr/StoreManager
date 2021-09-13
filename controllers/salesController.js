const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const arr = req.body;
  const newSale = await salesService.createSale(arr);
  return res.status(200).json(newSale);
};

const getAllSales = async (_req, res) => {
const allSales = await salesService.getAllSales();
return res.status(200).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  return res.status(200).json(sale);
};

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const arr = req.body;
  const sale = await salesService.updateSaleById(id, arr);
  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
};