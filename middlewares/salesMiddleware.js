const { ObjectId } = require('mongodb');
const { getSalesId } = require('../models/salesModel');

const saleQuantity = async (req, res, next) => {
  const getQuantity = req.body;
  const validQuantity = getQuantity.every((result) => result.quantity > 0);
  if (!validQuantity) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
  next();
};
const saleInvalid = async (req, res, next) => {
  if (!req.params.id || typeof req.body[0].quantity === 'string') {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
  if (req.body[0].quantity <= 0) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }
  next();
};
const isValidSale = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id.length !== 24) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' } });
  }
  next();
};
const getById = async (req, res, next) => {
  const getQuantity = await getSalesId(req.params.id);
  if (getQuantity.err) return getQuantity;
  next();
};
const validIdSale = async (req, res, next) => {
  const { id } = req.params;
  if (!ObjectId.isValid(id)) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }
  const saleId = await getSalesId(id);
  if (!saleId) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' } });
  }
  next();
};

module.exports = {
  saleQuantity,
  isValidSale,
  saleInvalid,
  validIdSale,
  getById,
};
