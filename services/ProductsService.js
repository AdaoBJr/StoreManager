const productModel = require('../models/productsModel');

const STATUS_ERROR_CLIENT = 422;

const checkIfNameExist = async (name) => {
  const findName = await productModel.findByName(name);
  return findName;
};

const productNameCheck = async (req, res, next) => {
  const { name } = req.body;
  const checkName = await checkIfNameExist(name);
  if (name.length < 5) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      } });
  }
  if (checkName) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Product already exists',
      },
    });
  }
  return next();
};

const productQuatityCheck = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be a number',
      },
    });
  }
  if (quantity < 1) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"quantity" must be larger than or equal to 1',
      },
    });
  }
  return next();
};

const productUpdateCheck = async (req, res, next) => {
  const { name } = req.body;
  const nameMinLength = 5;
  if (name.length < nameMinLength) {
    return res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: '"name" length must be at least 5 characters long',
      },
    });
  }
  return next();
};

const idRemoveCheck = async (req, res, next) => {
  const { id } = req.params;
  const product = await productModel.getById(id);
  if (!product) {
    res.status(STATUS_ERROR_CLIENT).json({
      err: {
        code: 'invalid_data',
        message: 'Wrong id format',
      },
    });
  }
  return next();
};

module.exports = { 
  productNameCheck, 
  productQuatityCheck, 
  productUpdateCheck,
  idRemoveCheck };
