const { ObjectId } = require('mongodb');

function productId(request, _response, next) {
  const { id } = request.params;

  const isValid = ObjectId.isValid(id);

  if (isValid) { return next(); }

  const newError = { code: 'invalid_data', message: 'Wrong id format' };

  return next(newError);
}

module.exports = { productId };
