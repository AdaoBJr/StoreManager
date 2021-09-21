const rescue = require('express-rescue');
const Sales = require('../services/Sales');

const createSale = rescue(async (req, res, _next) => {
  const itensSold = req.body;
  const newSale = await Sales.createSale(itensSold);
  // console.log(newSale);

  if (typeof newSale.err !== 'undefined') {
    return res.status(422).json(newSale);
  }

  return res.status(200).json(newSale);
});

const getAllSales = rescue(async (_req, res, _next) => {
  const sales = await Sales.getAllSales();

  return res.status(200).json({ sales });
});

const findSaleById = rescue(async (req, res, _next) => {
  const { id } = req.params;
  const sale = await Sales.findSaleById(id);

  if (typeof sale.err !== 'undefined') return res.status(404).json(sale);
  if (!sale) return res.status(404).json(sale);

  return res.status(200).json(sale);
});

module.exports = {
  createSale,
  findSaleById,
  getAllSales,
};