const productService = require('../services/productService');

const invalidDataStatus = 422;

const isValidName = (req, res, next) => {
  const { name } = req.body;
  const validateName = productService.nameValidation(name);

  if (!validateName) {
    return res.status(invalidDataStatus).json({
      err: {
        message: '"name" deve possuir pelo menos 5 caracteres',
        code: 'invalid_data',
      },
    });
  }
  next();
};

const isValidQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validateQuantity = productService.quantityValidation(quantity);

  if (!validateQuantity) {
    return res.status(invalidDataStatus).json({
      err: {
        message: '"quantity" deve ser um "number" maior ou igual a 1',
        code: 'invalid_data',
      },
    });
  }
  next();
};

const productsCreation = (req, res, next) => {
  const { name, quantity } = req.body;
  const result = productService.addProduct({ name, quantity });

  if (!result) {
    return res.status(invalidDataStatus).json({
      err: {
        message: 'Produto já existe',
        code: 'invalid_data',
      },
    });
  }
  next();
};

module.exports = {
  isValidName,
  isValidQuantity,
  productsCreation,
};
