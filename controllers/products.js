const { ObjectId } = require('mongodb');
const { getAllProducts } = require('../models/products');

const validateId = (req, res, next) => {
  const { id } = req.params;
  if (typeof id !== 'string' || !ObjectId.isValid(id)) {
    return res.status(httpStatus.invalidData).json({
      err: {
        message: 'Wrong id format',
        code: 'invalid_data',
      },
    });
  }
  next();
};

const getAll = async (_req, res) => {
  const allProducts = await getAllProducts();
  res.status(200).json(allProducts);
};

module.exports = {
  validateId,
  getAll,
};
