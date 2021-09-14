const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const item = req.body;
  
  const sale = await salesService.createSale(item);
  if (sale.error) return res.status(422).json(sale.err);
  return res.status(200).json(sale);
};

const getAllSales = async (_req, res) => {
  const sales = await salesService.findAllSales();
  return res.status(200).json(sales);
};

const getByIdSale = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findId(id);

  if (sale.error) return res.status(404).json({ err: sale.err });
  return res.status(200).json(sale);
};

const updateSale = async (req, res) => {
  const item = req.body;
  const { id } = req.params;
  const sale = await salesService.updateSale(id, item);
  if (sale.error) return res.status(422).json(sale.err);
  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  getByIdSale,
  updateSale,
};