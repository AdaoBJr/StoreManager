// const sales = require('../models/sales');

const isValidId = (req, res, next) => {
  console.log(req.body, 'req.body');
  const [{ productId }] = req.body;
  if (!productId || productId.length < 24 || productId === null) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
        } });
  }
  next();
};

const isValidIdSale = async (req, res, next) => {
  const { id } = req.params;
  if (!id || id.length !== 24 || id === null) {
  return res.status(404).json({
    err: {
      code: 'not_found',
      message: 'Sale not found',
      },
    });
  }
  next();
};
module.exports = { isValidId, isValidIdSale };
