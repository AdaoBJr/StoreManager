const productsModel = require('../../models/productsModel');

async function validateCreateName(name) {
  const productByName = await productsModel.getByName({ name });

  if (productByName) return 'name exists';
  if (typeof name !== 'string' || name.length < 5) return '< then 5';
}

async function validateCreateQuantity(quantity) {
  if (quantity <= 0) return 'quantity < 0';
  if (typeof quantity !== 'number') return 'quantity not a number';
}

module.exports = {
  validateCreateName,
  validateCreateQuantity,
};