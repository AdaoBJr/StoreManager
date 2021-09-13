const mongo = require('mongodb');
const model = require('../models/productsModel');

const errors = {
  nameShort: '"name" length must be at least 5 characters long',
  nameExists: 'Product already exists',
  quantityLesserThanOne: '"quantity" must be larger than or equal to 1',
  quantityNotANumber: '"quantity" must be a number',
  wrongIdFormat: 'Wrong id format',
};

const status = 422;
const code = 'invalid_data';

const isString = (value) => (typeof value === 'string');
const isLesserThanOrEqualTo0 = (value) => value <= 0;
const lengthIsLesserThan = (value, min) => value.length <= min;
const productExists = async (name) => {
  const insertedProduct = await model.findByName(name);
  if (insertedProduct !== null) return true;
  return false;
};
const isObjectId = (id) => mongo.ObjectID.isValid(id);
const productDonotExist = async (id) => {
  const existingProduct = await model.findById(id);
  if (existingProduct) return false;
  return true;
};

const validateNameAndQty = async (name, quantity) => {
  switch (true) {
    case lengthIsLesserThan(name, 5): 
      return { status, err: { code, message: errors.nameShort } };
      case isLesserThanOrEqualTo0(quantity): 
      return { status, err: { code, message: errors.quantityLesserThanOne } };
      case isString(quantity): 
      return { status, err: { code, message: errors.quantityNotANumber } };
      case await productExists(name): 
        return { status, err: { code, message: errors.nameExists } };
    default: return {};
  }
};

const validateId = async (id) => {
  switch (true) {
    case !isObjectId(id):
      return { status, err: { code, message: errors.wrongIdFormat } };
    case await productDonotExist(id):
        return { status, err: { code, message: errors.wrongIdFormat } };
    default: return {};
  }
};

module.exports = {
  validateNameAndQty,
  validateId,
};
