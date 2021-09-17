const sales = require('../errors/valideSalesHelper');

module.exports = (req, _res, next) => {
  const { body } = req;
  body.forEach((sale) => {
    const { error } = sales.validate(sale);
    if (error) return next(error);
  });
  return next();
};