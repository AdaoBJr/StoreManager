const { errorBuilder, errorMiddleware } = require('./errorMiddleware');
const { validateName, validateQuantity } = require('./productsMiddleware');
const salesValidation = require('./salesMiddleware');

module.exports = {
  errorBuilder, 
  errorMiddleware,
   validateName,
    validateQuantity, 
    salesValidation,
};