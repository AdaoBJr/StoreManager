const productsService = require('../services/productsService');

const validName = (req, res, next) => {
  const { name } = req.body;
  const validateName = productsService.validationName(name);

  if (!validateName) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  next();
};

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validateQauntity = productsService.validationQuantity(quantity);

  if (!validateQauntity) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};

const createProducts = (req, res, next) => {
  const { name, quantity } = req.body;
  const result = productsService.createProduct({ name, quantity });

  if (!result) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  next();
};

module.exports = {
  validName,
  validQuantity,
  createProducts,
};