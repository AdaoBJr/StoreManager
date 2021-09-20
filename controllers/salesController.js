const rescue = require('express-rescue');
const salesService = require('../services/salesService');

const createSale = rescue(async (req, res, next) => {
  const createdSales = await salesService.createSales(req.body);
  if (createdSales.error) return next(createdSales.error);
  res.status(200).json({ ...createdSales });
});

const getAllSales = rescue(async (_req, res, next) => {
  const allSales = await salesService.getAllSales();
  if (allSales.error) return next(allSales.error);

  return res.status(200).json(allSales); // Status 200 - Ok/Success
});

const getSaleById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  if (sale.error) return next(sale.error);

  return res.status(200).json(sale);
});

const updateSale = rescue(async (req, res, next) => {
  const { id } = req.params;

  const updatedSales = await salesService.updateSales(id, req.body);
  if (updatedSales.error) return next(updatedSales.error);

  return res.status(200).json(updatedSales);
});

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
};