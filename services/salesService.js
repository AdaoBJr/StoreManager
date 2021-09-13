const { salesValidator } = require('../middleware/sales');
const {
  modelCreate,
} = require('../models/salesModel');
// const { allValidator } = require('../middleware/sales');

const servCreate = async (itens) => {
  const invalidator = await salesValidator(itens);
  if (invalidator) {
    return invalidator;
  }
  const a = await modelCreate(itens);
  return a;
};
module.exports = {
  servCreate,
};