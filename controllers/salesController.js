const salesService = require('../services/salesService');

const createSale = async (req, res) => {
  const arr = req.body;
  const newSale = await salesService.createSale(arr);
  if (newSale.err) {
 return res.status(404).json(
    { err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } },
  ); 
}
  return res.status(200).json(newSale);
};

const getAllSales = async (_req, res) => {
const allSales = await salesService.getAllSales();
return res.status(200).json(allSales);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.getSaleById(id);
  return res.status(200).json({ sale });
};

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const arr = req.body;
  const sale = await salesService.updateSaleById(id, arr);
  return res.status(200).json(sale);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.deleteSaleById(id);
  return res.status(200).json(sale);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};