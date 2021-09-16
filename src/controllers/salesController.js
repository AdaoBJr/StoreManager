const salesService = require('../services/salesService');
const { dictionary } = require('../helpers/dictionary');

const addSale = async (req, res, next) => {
  const arraySales = req.body;
  const { ok } = dictionary().status;

  const newSale = await salesService.addSale(arraySales);

  if (newSale.err) return next(newSale.err);

  res.status(ok).json(newSale);
};

const getAllSales = async (_req, res) => {
  const { ok } = dictionary().status;

  const allSales = await salesService.getAllSales();

  res.status(ok).json(allSales);
};

const getSaleById = async (req, res, next) => {
  const { id } = req.params;
  const { ok } = dictionary().status;

  const sale = await salesService.getSaleById(id);

  if (sale.err) return next(sale.err);

  res.status(ok).json(sale);

  next();
};

module.exports = { addSale, getAllSales, getSaleById };
