const { products } = require('../schemas');

module.exports = (req, res, next) => {
  const { error } = products.validate(req.body);
  if (error) next(error);
  next();
};
