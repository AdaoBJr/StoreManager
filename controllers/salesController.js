const { ObjectId } = require('mongodb');
const { createS, getAllS, getIdS, updateS, deleteS } = require('../services/salesService');
const { getSalesId } = require('../models/salesModel');

const createSale = async (req, res) => {
  const result = req.body;
  const sales = await createS(result);
  const { _id } = sales;
  if (!_id) {
    return res.status(404).json(sales);
  }
  return res.status(200).json(sales);
};
const getAllSale = async (req, res) => {
  const sales = await getAllS();
  return res.status(200).json({ sales });
};
const deleteSale = async (req, res) => {
  const { id } = req.params;
  const { sale } = await getSalesId(id);
  const result = await deleteS({ id });
  if (!ObjectId.isValid(id)) {
    return res.status(422).json({ err: {
      code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  if (result.deletedCount === 0) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' } });
  }
  if (result.deletedCount > 0) {
    return res.status(200).json(sale);
  }
};
const getSaleId = async (req, res) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' } });
  }
  const sales = await getIdS(id);
  if (sales.status === 404) {
    const { err } = sales;
    return res.status(sales.status).json({ err });
  }
  return res.status(sales.status).json(sales.sale);
};
const updateSale = async (req, res) => {
  const { id } = req.params;
  await updateS({ id, productId: req.body[0].productId, quantity: req.body[0].quantity });
  return res.status(200).json({
    _id: id, itensSold: [{ productId: req.body[0].productId, quantity: req.body[0].quantity }] });
};

module.exports = {
  createSale,
  getAllSale,
  getSaleId,
  updateSale,
  deleteSale,
};
