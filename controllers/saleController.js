const rescue = require('express-rescue');

const Service = require('../services/saleService');

const status = {
  OK: 200,
};

const getAllSales = rescue(async (_req, res) => {
  const sales = await Service.getAllSales();

  return res.status(status.OK).json({ sales });
});

const getSaleById = rescue(async (req, res) => {
  const { id } = req.params;

  const sale = await Service.getSaleById(id);

  return res.status(status.OK).json(sale);
});

const insertSale = rescue(async (req, res) => {
  const sales = req.body;

  const insertedSale = await Service.insertSale(sales);

  return res.status(status.OK).json(insertedSale);
});

const updateSale = rescue(async (req, res) => {
  const sale = req.body;
  const { id } = req.params;

  const updatedSale = await Service.updateSale(id, sale);

  return res.status(status.OK).json(updatedSale);
});

const deleteSale = rescue(async (req, res) => {
  const { id } = req.params;

  const deletedSale = await Service.deleteSale(id);

  return res.status(status.OK).json(deletedSale);
});

module.exports = {
  getAllSales,
  getSaleById,
  insertSale,
  updateSale,
  deleteSale,
};
