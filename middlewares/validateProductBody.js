const Validations = require('../validations');
const Product = require('../models/productModel');

const error = { err:
  {
    code: 'invalid_data',
    message: 'Product already exists',
  },
statusCode: 422,
};

const validateProductBody = async (req, res, next) => {
  const { name, quantity } = req.body;

  const invalidName = Validations.validateName(name);
  if (invalidName) return next(invalidName);

  const invalidQuantity = Validations.validateQuantity(quantity);
  if (invalidQuantity) return next(invalidQuantity);

  const products = await Product.getAllProducts();
  const product = products.find((current) => current.name === name);
  if (product) return next(error);

  next();
};

module.exports = validateProductBody;