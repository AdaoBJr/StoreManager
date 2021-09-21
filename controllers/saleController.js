const { StatusCodes } = require('http-status-codes');
const saleService = require('../services/saleService');

const createSale = async (req, res, next) => {
  const items = req.body;
  const newSale = await saleService.createSale(items);

  if (newSale.error) return next(newSale);

  res.status(StatusCodes.OK).json(newSale);
};

const getAll = async (_req, res, _next) => {
  const allSales = await saleService.getAll();

  res.status(StatusCodes.OK).json({ sales: allSales });
};

const getById = async (req, res, next) => {
  const { id } = req.params;
  const sale = await saleService.getById(id);

  if (sale.error) return next(sale);

  res.status(StatusCodes.OK).json(sale);
};

const updateSale = async (req, res, next) => {
  const { id } = req.params;
  const item = req.body;
  const updatedSale = await saleService.updateSale(id, item);

  if (updatedSale.error) return next(updatedSale);

  res.status(StatusCodes.OK).json(updatedSale);
};

const deleteSale = async (req, res, next) => {
  const { id } = req.params;
  const deletedSale = await saleService.deleteSale(id);

  if (deletedSale.error) return next(deletedSale);

  res.status(StatusCodes.OK).json(deletedSale);
};

module.exports = {
  createSale,
  getAll,
  getById,
  updateSale,
  deleteSale,
};
