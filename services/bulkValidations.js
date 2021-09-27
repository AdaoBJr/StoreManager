const { ObjectId } = require('mongodb');

function productIds(data) {
  const result = data.every(({ productId }) => ObjectId.isValid(productId));

  if (result) { return true; }

  return false;
}

module.exports = { productIds };
