// const salesService = require('../services/salesService');
const salesModel = require('../models/salesModel');

const registerNewSale = async (req, res) => {
  const sales = req.body;
  // const insertSales = await salesService.registerNewSale(sales);
  if (insertSales.err) {
    if (insertSales.err.code === 'stock_problem') return res.status(404).json(insertSales);
    return res.status(422).json(insertSales);
  }
  res.status(200).json(insertSales);
};

const getSales = async (_req, res) => {
  const sales = await salesModel.getSales();
  res.status(200).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  // const sales = await salesService.getSalesById(id);
  if (sales.err) {
    return res.status(404).json(sales);
  }
  res.status(200).json(sales);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const update = req.body;
  // const sale = await salesService.updateSale({ id, update });
  if (sale.err) {
    if (sale.err.code === 'stock_problem') return res.status(404).json(sale);
    return res.status(422).json(sale);
  }
  res.status(200).json(sale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  // const sale = await salesService.deleteSale(id);
  if (sale.err) {
    return res.status(422).json(sale);
  }
  res.status(200).json(sale);
};

module.exports = {
  registerNewSale,
  getSales,
  getSalesById,
  updateSale,
  deleteSale,
};
