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

const validQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validateQuantity = productsService.validationQuantity(quantity);

  if (!validateQuantity) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  next();
};

const validTypeQuantity = (req, res, next) => {
  const { quantity } = req.body;
  const validateQuantity = productsService.validationTypeQuantity(quantity);

  if (!validateQuantity) {
    return res.status(422).json({
      err: { 
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  next();
};

const validId = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.verifyId(id);
  if (!product) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format', 
      },
    });
  } 
    return res.status(200).json(product);
};

const AllProducts = async (req, res) => {
  const getAllProducts = await productsService.getAllProducts();

  if (!getAllProducts) {
    return res.status(422).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format', 
      },
    });
  } 
    return res.status(200).json(getAllProducts);
};

module.exports = {
  validName,
  validQuantity,
  createProducts,
  validId,
  AllProducts,
  validTypeQuantity,
};