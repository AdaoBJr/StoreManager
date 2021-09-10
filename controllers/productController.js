const service = require('../services/productService');

const CREATED = 201;
const UNPROCESSABLE = 422;
const HTTP_BAD_REQUEST = 400;

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
  if (!quantity) {
    return res.status(HTTP_BAD_REQUEST).json({ message: 'O campo "quantity" é obrigatório' });
  }
  next();
};

const create = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await service.create(name, quantity);

  res.status(CREATED).json({ id: product.id, name, quantity });
};

module.exports = { create, validName, validQuantity };
