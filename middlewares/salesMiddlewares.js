const { ObjectId } = require('mongodb');
const { listById } = require('../models/salesModel');

const isValidQuantity = async (req, res, next) => {
  const retorno = req.body;

  const quantityIsValid = retorno.every((result) => result.quantity > 0);

  if (!quantityIsValid) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }

  next();
};

const isValidQuantityUpdate = async (req, res, next) => {
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
  const retorno = await listById(req.params.id);
  if (retorno.err) return retorno;
  next();
};

const isValidId = async (req, res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong sale ID format' } });
  }

  const existeSale = await listById(id);
  if (!existeSale) {
    return res.status(404).json({
      err: { code: 'not_found', message: 'Sale not found' } });
  }

  next();
};

module.exports = { isValidQuantity, isValidSale, isValidQuantityUpdate, isValidId, getById };
