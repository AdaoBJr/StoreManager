const productNameLength = {
  err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };

const productAlreadyExists = { err: { code: 'invalid_data', message: 'Product already exists' } };

const productNumberQuantity = {
  err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };

const productTypeQuantity = {
  err: { code: 'invalid_data', message: '"quantity" must be a number' } };

module.exports = {
  productNameLength,
  productAlreadyExists,
  productNumberQuantity,
  productTypeQuantity,
};