const { ObjectId } = require('mongodb');

// const bulkValidations = require('../services/bulkValidations');

function productIdFromParams(request, _response, next) {
  const { id } = request.params;
  
  const isValid = ObjectId.isValid(id);
  
  if (isValid) { return next(); }
  
  const invalidData = { code: 'invalid_data', message: 'Wrong id format' };

  return next(invalidData);
}

// function productIdFromBody(request, _response, next) {
//   const { body } = request;

//   const isValid = bulkValidations.productIds(body);

//   if (isValid) { return next(); }

//   const invalidData = { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' };

//   return next(invalidData);
// }

module.exports = { productIdFromParams /* productIdFromBody */ };
