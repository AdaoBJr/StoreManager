const { ObjectId } = require('mongodb');
const Model = require('../models/saleModel');

module.exports = async (req, _res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return next(
      {
        err: { code: 'invalid_data', message: 'Wrong sale ID format' },
        statusCode: 422,
      },
    );
  }

  const sales = await Model.getAllSales();
  const sale = sales.find(({ _id: saleId }) => saleId === id);

  if (sale === undefined) {
    return next(
      { err: { code: 'not_found', message: 'Sale not found' }, statusCode: 404 },
    );
  }

  next();
};