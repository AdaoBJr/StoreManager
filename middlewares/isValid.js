const { ObjectId } = require('mongodb');

function productIdFromParams(request, _response, next) {
  const { id } = request.params;
  
  const isValid = ObjectId.isValid(id);
  
  if (isValid) { return next(); }
  
  const invalidData = { code: 'invalid_data', message: 'Wrong id format' };

  return next(invalidData);
}

function salesIdFromPutParams(request, _response, next) {
  const { id } = request.params;

  const validId = ObjectId.isValid(id);
  const isInvalid = !validId && (typeof Number(id) === 'number');

  if (isInvalid) { 
    const invalidId = { code: 'not_found', message: 'Sale not found' };
  
    return next(invalidId);
  }

   return next();
}

function salesIdFromDeleteParams(request, _response, next) {
  const { id } = request.params;

  const validId = ObjectId.isValid(id);
  const isInvalid = !validId && (typeof Number(id) === 'number');

  if (isInvalid) {
    const invalidId = { code: 'invalid_data', message: 'Wrong sale ID format' };

    return next(invalidId);
  }

  return next();
}

module.exports = { productIdFromParams, salesIdFromPutParams, salesIdFromDeleteParams };
