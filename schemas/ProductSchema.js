const model = require('../models/productsModel');

const errors = {
  nameShort: '"name" length must be at least 5 characters long',
  nameExists: 'Product already exists',
  quantityLesserThanOne: '"quantity" must be larger than or equal to 1',
  quantityNotANumber: '"quantity" must be a number',
};

const isString = (value) => (typeof value === 'string');
const isLesserThanOrEqualTo0 = (value) => value <= 0;
const lengthIsLesserThan = (value, min) => value.length <= min;
const productExists = async (name) => {
  const insertedProduct = await model.findByName(name);
  if (insertedProduct !== null) return true;
  return false;
};

const validate = async (name, quantity) => {
  const status = 422;
  const code = 'invalid_data';
  switch (true) {
    case lengthIsLesserThan(name, 5): 
      return { status, err: { code, message: errors.nameShort } };
    case await productExists(name): 
      return { status, err: { code, message: errors.nameExists } };
    case isLesserThanOrEqualTo0(quantity): 
      return { status, err: { code, message: errors.quantityLesserThanOne } };
    case isString(quantity): 
      return { status, err: { code, message: errors.quantityNotANumber } };
    default: return {};
  }
};

module.exports = {
  validate,
};
