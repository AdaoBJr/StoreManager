const productsModel = require('../models/productsModel');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  quantityLargerThan1: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
};

const checkNameLength = (name, len) => name.length <= len;

// const checkProductExists = async (name) => {
//   const response = await productsModel.findByName(name);
//   if (response) return true;
//   return false;
// };

const checkIsNumber = (quantity) => typeof quantity !== 'number';

const checkLessThanZ = (quantity) => quantity <= 0;
// const checkIsInt = (quantity) => Number.isInteger(quantity);

const isProductValid = (name, quantity) => {
switch (true) {
  case checkNameLength(name, 5): return { code: 422, message: errors.nameLength };
  case checkIsNumber(quantity): return { code: 422, message: errors.quantityNotNumber };
  case checkLessThanZ(quantity): return { code: 422, message: errors.quantityLargerThan1 };
  default:
    return {};
}
};

// const isNameValid = (name) => {
//   if (
//     !name
//     || typeof name !== 'string'
//     || name.length < 5
//     // verificar se o name é unico
//   ) return false;
//   return true;
// };

// const isQuantityValid = (quantity) => {
//   if (
//     !quantity
//     || typeof quantity !== 'number'
//     || quantity <= 0
//     || Number.isInteger(quantity) === false
//   ) return false;
//   return true;
// };

module.exports = {
  isProductValid,
};