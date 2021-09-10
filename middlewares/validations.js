const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  productExists: 'Product already exists',
  quantityLargerThan1: '"quantity" must be larger than or equal to 1',
  quantityNotNumber: '"quantity" must be a number',
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

module.exports = {
  isProductValid,
};