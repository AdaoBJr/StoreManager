const codes = require('./codes');
const isLesserThan = require('./common');
const messages = require('./messages');
const { nameValidation, quantityValidation } = require('./productVal');
const { salesQuantityValidation } = require('./salesVal');

module.exports = {
  codes,
  messages,
  isLesserThan,
  nameValidation,
  quantityValidation,
  salesQuantityValidation,
};