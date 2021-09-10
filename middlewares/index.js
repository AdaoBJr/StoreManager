const errorMiddleware = require('./errorMiddleware');
const { products } = require('../schemas');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) next(error);
  next();
};

module.exports = {
  errorMiddleware,
  productValidate: validate(products),
};
