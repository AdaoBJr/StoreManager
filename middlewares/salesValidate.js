const { sales } = require('../schemas');

module.exports = (req, res, next) => {
  const { body } = req;
  body.forEach((sale) => {
    const { error } = sales.validate(sale);
    if (error) return next(error);
  });
  return next();
};
