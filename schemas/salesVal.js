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

module.exports = salesQuantityValidation;