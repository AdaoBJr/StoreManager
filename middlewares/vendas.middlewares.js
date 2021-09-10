// const middlewarProd = require('./produtos.middlewares');
// const { ObjectId } = require('mongodb');
// const connection = require('../models/mongoConnection');

const isValidQuantity = async (req, res, next) => {
  const retorno = req.body;

  const quantityIsValid = retorno.every((result) => result.quantity > 0);

  if (!quantityIsValid) {
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

module.exports = { isValidQuantity, isValidSale };
