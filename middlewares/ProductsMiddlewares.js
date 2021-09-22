const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const isValidName = async (req, res, next) => {
  const { name } = req.body;

  if (name.length < 5) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' },
    });
  }

  next();
};

const productExists = async (req, res, next) => {
  const db = await connection();
  const { name } = req.body;
  const productExistsInBank = await db.collection('products').findOne({ name });
  
  if (productExistsInBank) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Product already exists' },
    });
  }

  next();
};

const isValidQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be a number' },
    });
  }

  if (quantity <= 0) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } });
  }

  next();
};

const isValidProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id || id.length !== 24) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong id format' },
    });
  }

  next();
};

const deleteProductMiddleware = async ({ id }) => {
  const db = await connection();

  if (!id || id.length !== 24) {
    return null;
  }

  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

module.exports = {
  isValidName,
  productExists,
  isValidQuantity,
  isValidProduct,
  deleteProductMiddleware,
};
