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

const updateSaleById = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  const result = await service.updateSaleById(id, updates);
  if (result.err) {
    const { err } = result;
    return res.status(result.status).json({ err });
  }
  res.status(200).json(result);
};

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const result = await service.deleteSaleById(id);
  if (result.err) {
    return res.status(result.status).json({ err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
  } });
  }
  res.status(200).json(result);
};

module.exports = {
  insertNewSale,
  getAllSales,
  getSaleById,
  updateSaleById,
  deleteSaleById,
};