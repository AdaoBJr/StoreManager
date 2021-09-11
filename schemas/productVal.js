const codes = require('./codes');
const messages = require('./messages');
const isLesserThan = require('./common');

const nameValidation = (value) => {
  const MINIMUM = 5;  
  const isLesser = isLesserThan(value.length, MINIMUM);
  if (isLesser) {
    return {
      status: codes.UNPROCESSABLE_ENTITY, 
      code: codes.INVALID_DATA,
      message: messages.INVALID_NAME_CHAR_QTY, 
    }; 
  }
  return {};
};

const quantityValidation = (quantity) => {
  const MINIMUM = 1;
  const isLesser = isLesserThan(quantity, MINIMUM);
  if (isLesser) {
    return {
      status: codes.UNPROCESSABLE_ENTITY, 
      code: codes.INVALID_DATA,
      message: messages.INVALID_QUANTITY_QTY, 
    }; 
  }
  if (typeof quantity !== 'number') {
    return {
      status: codes.UNPROCESSABLE_ENTITY, 
      code: codes.INVALID_DATA,
      message: messages.INVALID_QUANTITY_TYPE, 
    };
  }
  return {};
};
module.exports = {
  nameValidation,
  quantityValidation,
};