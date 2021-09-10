// const middlewarProd = require('./produtos.middlewares');
// const { ObjectId } = require('mongodb');
// const connection = require('../models/mongoConnection');

const isValidQuantity = async (req, res, next) => {
  const retorno = req.body;

  const quantityIsValid = retorno.every((result) => result.quantity > 0);

  console.log(quantityIsValid);
  if (!quantityIsValid) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } });
  }

  next();
};

module.exports = { isValidQuantity };
