const Sale = require('../services/sales.services');

const create = async (req, res) => {
  const allSales = req.body;
  const { code, err, newSale } = await Sale.create(allSales);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(newSale);
};

const getAll = async (_req, res) => {
  const { code, sales } = await Sale.getAll();
  return res.status(code).json({ sales });
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { code, err, sale } = await Sale.getSaleById(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(sale);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { code, err, updatedSale } = await Sale.update(id, req.body);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(updatedSale);
};

const removeSale = async (req, res) => {
  const { id } = req.params;
  const { code, err, sale } = await Sale.removeSale(id);
  if (err) return res.status(code).json({ err });
  return res.status(code).json(sale);
};

module.exports = { create, getAll, getSaleById, update, removeSale };
