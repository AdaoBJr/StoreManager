const codes = require('./codes');
const messages = require('./messages');
const isLesserThan = require('./common');

const salesQuantityValidation = ({ quantity }) => {
  const MINIMUM = 1;
  const isLesser = isLesserThan(quantity, MINIMUM);
  if (isLesser) {
    return {
      status: codes.UNPROCESSABLE_ENTITY, 
      code: codes.INVALID_DATA,
      message: messages.INVALID_PRODUCT_ID_QUANTITY, 
    }; 
  }
  if (typeof quantity !== 'number') {
    return { 
      status: codes.UNPROCESSABLE_ENTITY, 
      code: codes.INVALID_DATA,
      message: messages.INVALID_PRODUCT_ID_QUANTITY, 
    };
  }
  return {};
};

const notEnoughItems = (stockitems, sales) => {
  const stockMissingItems = stockitems.filter(({ _id, quantity }, i) => {
    if (_id.toString() === sales[i].productId && sales[i].quantity > quantity) {
      return 1;
    }
      return 0;
  });
  const hasStockProblem = stockMissingItems.length > 0;
  return hasStockProblem;
};

module.exports = { salesQuantityValidation, notEnoughItems };