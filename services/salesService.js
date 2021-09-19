const salesModels = require('../models/salesModels');
const validateCreate = require('../validations/sales/validateCreate');

async function create(body) {
  const validateQuantity = validateCreate.validateQuantity(body);
  if (validateQuantity) return validateQuantity;

  const createdSale = await salesModels.create(body);
  return createdSale;
}

module.exports = {
  create,
};