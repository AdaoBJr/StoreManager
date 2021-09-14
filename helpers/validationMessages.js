const error = { message: 'Ops, an error occurred with your request' };

const productWrongFormat = { err: { code: 'invalid_data', message: 'Wrong id format' } };

const productNameLength = {
  err: { code: 'invalid_data', message: '"name" length must be at least 5 characters long' } };

const productAlreadyExists = { err: { code: 'invalid_data', message: 'Product already exists' } };

const productNumberQuantity = {
  err: { code: 'invalid_data', message: '"quantity" must be larger than or equal to 1' } };

const productTypeQuantity = {
  err: { code: 'invalid_data', message: '"quantity" must be a number' } };

const saleNumberQuantity = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' } };

const saleWrongFormat = {
  err: { code: 'invalid_data', message: 'Wrong sale ID format' } };  

const saleNotFound = {
  err: { code: 'not_found', message: 'Sale not found' } };

const saleStockProblem = {
  err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' } };  

module.exports = {
  error,
  productWrongFormat,
  productNameLength,
  productAlreadyExists,
  productNumberQuantity,
  productTypeQuantity,
  saleNumberQuantity,
  saleNotFound,
  saleWrongFormat,
  saleStockProblem,
};