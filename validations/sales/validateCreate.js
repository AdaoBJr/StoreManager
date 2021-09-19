function validateQuantity(body) {
  const validate = body
  .some((currentValue) => currentValue.quantity <= 0 || typeof currentValue.quantity !== 'number');
  if (validate) return 'invalid quantity';
}

module.exports = {
  validateQuantity,
};