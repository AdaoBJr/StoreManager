const { findByName } = require('../models/products');

const errors = {
  nameNotString: '"name" must be a string',
  nameLength: '"name" length must be at least 5 characters long',
  quantityLessThanOne: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  productExists: 'Product already exists',
};

const code = 422;

const nameIsCorrect = (name, validation) => {
  switch (true) {
    case typeof name !== 'string':
      return { ...validation, message: errors.nameNotString, err: true, code };
    case name.length < 5:
      return { ...validation, message: errors.nameLength, err: true, code };
    default: 
      return { ...validation };
  }
};

const quantyIsCorrect = (quantity, validation) => {
  if (validation.err) return { ...validation };

  switch (true) {
    case quantity < 1:
      return { ...validation, message: errors.quantityLessThanOne, err: true, code };
    case typeof quantity === 'string':
      return { ...validation, message: errors.quantityNotNumber, err: true, code };
    default: 
      return { ...validation };
  }
};

const nameIsEqual = async (name, validation) => {
  if (validation.err) return { ...validation };
  const existsProduct = await findByName({ name });
  switch (true) {
    case !existsProduct:
      return { ...validation, message: errors.productExists, err: true, code };
    default: 
      return { ...validation };
  }
};

const validate = async (name, quantity) => {
  let verify = { err: false, code: 200, message: false };
  verify = nameIsCorrect(name, verify);
  verify = quantyIsCorrect(quantity, verify);
  verify = await nameIsEqual(name, verify);
  return verify;
};

module.exports = {
  validate,
};