// const salesModel = require('../models/salesModel');

const validateQuantity = (req, res, next) => {
  const sales = req.body;
  const invalidNumber = sales.filter((s) => s.quantity <= 0);
  const invalidString = sales.filter((s) => typeof s.quantity !== 'number');

  if (invalidNumber.length > 0 || invalidString.length > 0) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong product ID or invalid quantity',
      },
    });
  }
  next();
};

module.exports = {
  validateQuantity,
};