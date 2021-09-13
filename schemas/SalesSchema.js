const mongo = require('mongodb');
const model = require('../models/salesModel');

const errors = {
  invalidIdOrQty: 'Wrong product ID or invalid quantity',
};

const status = 422;
const code = 'invalid_data';

const isString = (value) => (typeof value === 'string');
const isLesserThanOrEqualTo0 = (value) => value <= 0;
const isObjectId = (id) => mongo.ObjectID.isValid(id);
const productDonotExist = async (id) => {
  const existingProduct = await model.findProductById(id);
  if (existingProduct) return false;
  return true;
};
const validateIdAndQty = (id, qty) => {
  switch (true) {
    case isLesserThanOrEqualTo0(qty):
      return { status, err: { code, message: errors.invalidIdOrQty } };
    case isString(qty):
      return { status, err: { code, message: errors.invalidIdOrQty } };
    case !isObjectId(id):
      return { status, err: { code, message: errors.invalidIdOrQty } };
    case productDonotExist(id):
      return { status, err: { code, message: errors.invalidIdOrQty } };
    default: return {};
  }
};

const validation = (itensSold) => {
  for (let i = 0; i < itensSold.length; i += 1) {
    const { productId, quantity } = itensSold[i];
    const validate = validateIdAndQty(productId, quantity);
    if (validate.err) return validate;
  }
  return {};
};

module.exports = {
  validateIdAndQty,
  validation,
};
