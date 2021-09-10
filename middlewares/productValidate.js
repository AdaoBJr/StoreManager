const { product } = require('../schemas');

module.exports = (req, res, next) => {
  const { error } = product.validate(req.body);
  if (error) next(error);
  next();
};
