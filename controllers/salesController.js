const salesService = require('../services/salesService');
const { ok, not_found } = require('../utils/statusCodes');

const createSale = async (req, res) => {
  const result = await salesService.createSale(req.body);
  if (result.error) {return res.status(not_found).json({
    err: {
      code: 'stock_problem',
      message: result.error.message
    }
  });}
  
  return res.status(ok).json(result);
};

const getAllSales = async (req, res) => {
  const result = await salesService.getAllSales();
  return res.status(ok).json(result);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.getSaleById(id);
  return res.status(ok).json(result);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  const { productId, quantity } = req.body[0];
  const updatedSale = await salesService.updateSale(id,productId, quantity);
  return res.status(ok).json(updatedSale);
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const result = await salesService.deleteSale(id);
  return res.status(ok).json(result);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  deleteSale,
};
