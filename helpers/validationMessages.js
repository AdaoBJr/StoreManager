const error = { message: 'Ops, an error occurred with your request' };

const wrongFormat = { err: { code: 'invalid_data', message: 'Wrong id format' } };

const productNameLength = {
  err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };

const productAlreadyExists = { err: { code: 'invalid_data', message: 'Product already exists' } };

const productNumberQuantity = {
  err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };

const productTypeQuantity = {
  err: { code: 'invalid_data', message: '"quantity" must be a number' } };

module.exports = {
  error,
  wrongFormat,
  productNameLength,
  productAlreadyExists,
  productNumberQuantity,
  productTypeQuantity,
};