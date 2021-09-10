const productsModel = require('../models/productsModel');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  quantityNotNumber: '"quantity" must be a number',
  quantityValue: '"quantity" must be larger than or equal to 1',
  productExists: 'Product already exists',
  wrongId: 'Wrong id format',
};

const validNameLength = (req, res, next) => {
  const { name } = req.body;
  if (name.length <= 5) {
    return res.status(422).json({ err: { code: 'invalid_data', message: errors.nameLength } });
  }
  next();
};

const validQntType = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') {
    return res.status(422)
    .json({ err: { code: 'invalid_data', message: errors.quantityNotNumber } });
  }
  next();
};

const validQntValue = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) {
    return res.status(422)
    .json({ err: { code: 'invalid_data', message: errors.quantityValue } });
  }
  next();
};

const productExists = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.findByName(name);
  if (product) {
    return res.status(422)
    .json({ err: { code: 'invalid_data', message: errors.productExists } });
  }
  next();
};

const validId = async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) {
    return res.status(422)
    .json({ err: { code: 'invalid_data', message: errors.wrongId } });
  }
  next();
};

module.exports = {
  validNameLength,
  validQntType,
  validQntValue,
  productExists,
  validId,
};