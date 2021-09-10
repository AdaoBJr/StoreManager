const service = require('../services/productService');
const model = require('../models/productModel');

const CREATED = 201;
const UNPROCESSABLE = 422;
const HTTP_OK_STATUS = 200;

const validName = async (req, res, next) => {
  const { name } = req.body;
  const checkName = await service.validateName(name);
  switch (checkName) {
    case 'short name': return res.status(UNPROCESSABLE)
        .json({ err: {
          code: 'invalid_data',
          message: '"name" length must be at least 5 characters long',
        } });
    case 'product exist': return res.status(UNPROCESSABLE)
        .json({ err: {
          code: 'invalid_data',
          message: 'Product already exists',
        } }); 
    default:
      break;
  }
  next();
};

const validQuantity = async (req, res, next) => {
  const { quantity } = req.body;
  const checkQtd = await service.validateQuantity(quantity);
  switch (checkQtd) {
    case 'less equal 0': return res.status(UNPROCESSABLE)
        .json({ err: {
          code: 'invalid_data',
          message: '"quantity" must be larger than or equal to 1',
        } });
    case 'not a number': return res.status(UNPROCESSABLE)
        .json({ err: {
          code: 'invalid_data',
          message: '"quantity" must be a number',
        } }); 
    default:
      break;
  }
  next();
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await service.create(name, quantity);

  res.status(CREATED).json({ _id: product.id, name, quantity });
};

const getAll = async (_req, res) => {
  const { products } = await model.getAll();

  res.status(HTTP_OK_STATUS).json({ products });
};

module.exports = { create, validName, validQuantity, getAll };
