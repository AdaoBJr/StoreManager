const { ObjectId } = require('mongodb');
const Product = require('../models/productModel');

module.exports = async (req, _res, next) => {
  const { id } = req.params;

  if (!ObjectId.isValid(id)) {
    return next(
      { err: { code: 'invalid_data', message: 'Wrong id format' }, statusCode: 422 },
    );
  }

  const product = await Product.getProductById(id);
  if (!product) {
    return next(
      {
        err:
        { code: 'invalid_data', message: 'Wrong id format' },
        statusCode: 422,
      },
    );
  }

  return next();
};