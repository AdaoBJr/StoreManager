const { ObjectId } = require('mongodb');
const { criar, getAll, getById, update, removeSale } = require('../services/saleService');
const { listById } = require('../models/salesModel');

const createSales = async (req, res) => {
  const result = req.body;

  const sales = await criar(result);
  const { _id } = sales;
  if (!_id) {
    return res.status(404).json(sales);
  }
  return res.status(200).json(sales);
};

const listAll = async (req, res) => {
  const sales = await getAll();
  return res.status(200).json({ sales });
};

const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { venda } = await listById(id);
  const result = await removeSale({ id });

  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ err: {
      code: 'invalid_data', message: 'Wrong sale ID format' } });
  }

  if (result.deletedCount === 0) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' } });
  }

  if (result.deletedCount > 0) {
    return res.status(200).json(venda);
  }
};

const saleById = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' } });
  }
  const sales = await getById(id);
  if (sales.status === 404) {
    const { err } = sales;
    return res.status(sales.status).json({ err });
  }
  return res.status(sales.status).json(sales.venda);
};

const updateSale = async (req, res) => {
  const { id } = req.params;

  await update({ id, productId: req.body[0].productId, quantity: req.body[0].quantity });
  return res.status(200).json({
    _id: id, itensSold: [{ productId: req.body[0].productId, quantity: req.body[0].quantity }] });
};

module.exports = { createSales, listAll, saleById, updateSale, deleteSale };
