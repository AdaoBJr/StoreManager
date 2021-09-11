const { salesQuantityValidation } = require('../schemas/salesVal');
const { errorBuilder } = require('./errorMiddleware');

const salesValidation = (req, _res, next) => {
  const salesList = req.body;
  const salesListValidated = salesList.map((sales) => {
    const salesValidated = salesQuantityValidation(sales);
    if (salesValidated.code && salesValidated.status && salesValidated.status) {
      return salesValidated;
    }
    return '';
  });
  const error = salesListValidated.find((sales) => sales.status) || {};
  return next(errorBuilder(error));
};

module.exports = salesValidation;