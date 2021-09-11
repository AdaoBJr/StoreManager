const { ObjectId } = require('mongodb');
const connection = require('../models/connection');

const productValid = async (req, res, next) => {
  const db = await connection();
  const { name } = req.body;
  const productExist = await db.collection('products').findOne({ name });
  if (productExist) {
  return res.status(422).json({
    err: { code: 'invalid_data', message: 'Product already exists' } });
  }
  next();
};

const productExist = async ({ id }) => {
  const db = await connection();
  if (!id || id.length !== 24) {
    return null;
  }
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const validName = async (req, res, next) => {
  const { name } = req.body;
  if (name.length < 5) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } });
  }
  next();
};

const validQuantity = async (req, res, next) => {
  const { quantity } = req.body;

  if (typeof quantity !== 'number') {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be a number' } });
  }

  if (quantity <= 0) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } });
  }

  next();
};

const validateProduct = async (req, res, next) => {
  const { id } = req.params;

  if (!id || id.length !== 24) {
    return res.status(422).json({
      err: { code: 'invalid_data', message: 'Wrong id format' } });
  }

  next();
};

module.exports = { productValid, validName, validQuantity, productExist, validateProduct };
