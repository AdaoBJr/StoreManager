// const sales = require('../models/sales');

const isValidId = (req, res, next) => {
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

module.exports = { isValidId };
