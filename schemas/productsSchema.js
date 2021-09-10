const { findByName } = require('../models/productsModel');

const errors = {
  nameNotString: '"name" must be a string',
  nameLength: '"name" length must be at least 5 characters long',
  quantityLessThanOne: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  productExists: 'Product already exists',
};

const code = 422;

const validateName = (name, resultValidate) => {
  switch (true) {
    case typeof name !== 'string':
      return { ...resultValidate, message: errors.nameNotString, isNotOk: true, code };
    case name.length < 5:
      return { ...resultValidate, message: errors.nameLength, isNotOk: true, code };
    default: 
      return { ...resultValidate };
  }
}; 

const validateQuanty = (quantity, resultValidate) => {
  if (resultValidate.isNotOk) return { ...resultValidate };

  switch (true) {
    case quantity < 1:
      return { ...resultValidate, message: errors.quantityLessThanOne, isNotOk: true, code };
    case typeof quantity === 'string':
      return { ...resultValidate, message: errors.quantityNotNumber, isNotOk: true, code };
    default: 
      return { ...resultValidate };
  }
};

const validadteEqualName = async (name, resultValidate) => {
  if (resultValidate.isNotOk) return { ...resultValidate };
  const existsProduct = await findByName(name);
  console.log(!existsProduct);
  switch (true) {
    case !existsProduct:
      return { ...resultValidate, message: errors.productExists, isNotOk: true, code };
    default: 
      return { ...resultValidate };
  }
};

const validate = async (name, quantity) => {
  let resultValidate = { isNotOk: false, code: 200, message: false };
  resultValidate = validateName(name, resultValidate);
  resultValidate = validateQuanty(quantity, resultValidate);
  resultValidate = await validadteEqualName(name, resultValidate);
  return resultValidate;
};

module.exports = {
  validate,
};
