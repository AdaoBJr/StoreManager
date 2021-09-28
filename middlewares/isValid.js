const { ObjectId } = require('mongodb');

// const bulkValidations = require('../services/bulkValidations');

function productIdFromParams(request, _response, next) {
  const { id } = request.params;
  
  const isValid = ObjectId.isValid(id);
  
  if (isValid) { return next(); }
  
  const invalidData = { code: 'invalid_data', message: 'Wrong id format' };

  return next(invalidData);
}

function salesIdFromParams(request, _response, next) {
  const { id } = request.params;

  const validId = ObjectId.isValid(id);
  const isInvalid = !validId && (typeof Number(id) === 'number');

  if (isInvalid) { 
    const invalidData = { code: 'not_found', message: 'Sale not found' };
  
    return next(invalidData);
  }

   return next();
}

module.exports = { productIdFromParams, salesIdFromParams };
