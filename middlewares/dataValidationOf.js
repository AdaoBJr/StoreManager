const validate = require('../schemas/Validators');

function productCreation(request, _response, next) {
  const { error } = validate.productsData(request.body);

  if (error) return next(error);

  return next();
}

module.exports = { productCreation };
