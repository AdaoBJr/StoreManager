const productsModel = require('../models/productsModel');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  quantityLargerThan1: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
  wrongId: 'Wrong id format',
};

const checkNameLength = (name, len) => name.length <= len;

const checkIsNumber = (quantity) => typeof quantity !== 'number';

const checkLessThanZ = (quantity) => quantity <= 0;

const isProductValid = (name, quantity) => {
switch (true) {
  case checkNameLength(name, 5): return { code: 422, message: errors.nameLength };
  case checkIsNumber(quantity): return { code: 422, message: errors.quantityNotNumber };
  case checkLessThanZ(quantity): return { code: 422, message: errors.quantityLargerThan1 };
  default:
    return {};
}
};

const productExists = async (name) => {
  const product = await productsModel.findByName(name);
  if (product) return { code: 422, message: 'Product already exists' }; // nao rolou no validation
  return true;
};

const checkId = async (id) => {
  if (id.length !== 24) return { code: 422, message: errors.wrongId };
  const validId = await productsModel.getProductById(id);
  if (!validId) return { code: 422, message: errors.wrongId };
  return validId;
};

module.exports = {
  isProductValid,
  checkId,
  productExists,
};