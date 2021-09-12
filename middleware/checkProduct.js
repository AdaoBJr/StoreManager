const product = require('../models/products');

const checkProduct = async (req, res, next) => {
  const { name } = req.body;

  const checkproduct = await product.findProduct(name);

  if (checkproduct) {
  return res.status(422).json({
    err: {
      code: 'invalid_data',
      message: 'Product already exists',
      },
    });
  }
  next();
};

  module.exports = { checkProduct };
