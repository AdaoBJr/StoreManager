const service = require('../services/salesService');

const insertNewSale = async (req, res) => {
  const itensSold = req.body;
  const result = await service.insertNewSale(itensSold);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json({ err });
  } 
  res.status(200).json(result);
};

const getAllSales = async (_req, res) => {
  const result = await service.getAllSales();
  res.status(200).json({ sales: result });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await service.getSaleById(id);
  if (!result) {
    return res.status(404).json({ err: { code: 'not_found', message: 'Sale not found' } });
  }
  res.status(result.status).json(result.data);
};

module.exports = {
  insertNewSale,
  getAllSales,
  getSaleById,
};