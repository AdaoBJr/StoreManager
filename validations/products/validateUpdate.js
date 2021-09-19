async function validateUpdateName(name) {
  if (typeof name !== 'string' || name.length < 5) return '< then 5';
}

async function validateUpdateQuantity(quantity) {
  if (quantity <= 0) return 'quantity < 0';
  if (typeof quantity !== 'number') return 'quantity not a number';
}

module.exports = {
  validateUpdateName,
  validateUpdateQuantity,
};