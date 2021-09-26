const ProductsModel = require('../models/ProductsModel');

const productExists = async (request, _response, next) => {
  const { name } = request.body;

  const result = await ProductsModel.getAll()
      .then(({ products }) => products && products.some((item) => item.name === name));

  if (result) {
    const newError = { code: 'invalid_data', message: 'Product already exists' };

    return next(newError);
  }

  return next();
};

module.exports = { productExists };
