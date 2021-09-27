const { ObjectId } = require('mongodb');

function productIdFromParams(request, _response, next) {
  const { id } = request.params;
  
  const isValid = ObjectId.isValid(id);
  
  if (isValid) { return next(); }
  
  const invalidData = { code: 'invalid_data', message: 'Wrong id format' };

  return next(invalidData);
}

function productIdFromBody(request, _response, next) {
  const { productId } = request.body;

  const isValid = ObjectId.isValid(productId);

  if (isValid) { return next(); }

  const invalidData = { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };

  return next(invalidData);
}

module.exports = { productIdFromParams, productIdFromBody };
