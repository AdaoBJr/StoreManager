const { products } = require('../database');
const { sales } = require('../database');
const responseErrors = require('./responseErrors');

const validate = (database) => (req, _res, next) => {
  const { error } = database.validate(req.body);

  if (error) next(error);

  next();
};

const validateSales = (database) => (req, res, next) => {
  const { body } = req;
  body.forEach((sale) => {
    const { error } = database.validate(sale);
    if (error) return next(error);
  });
  return next();
};

module.exports = {
  responseErrors,
  productValidate: validate(products),
  saleValidate: validateSales(sales),
};
