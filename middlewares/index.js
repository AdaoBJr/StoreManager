const { products } = require('../database');
const responseErrors = require('./responseErrors');

const validate = (database) => (req, _res, next) => {
  const { error } = database.validate(req.body);

  if (error) next(error);

  next();
};

module.exports = {
  responseErrors,
  productValidate: validate(products),
};
