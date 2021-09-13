const productsModel = require('../models/productsModel');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  qntNotNumber: '"quantity" must be a number',
  qntValue: '"quantity" must be larger than or equal to 1',
  productExists: 'Product already exists',
  wrongId: 'Wrong id format',
  wrongIdOrQnt: 'Wrong product ID or invalid quantity',
};

const errMsg = (message) => ({ err: { code: 'invalid_data', message } });

const validNameLength = (req, res, next) => {
  const { name } = req.body;
  if (name.length <= 5) return res.status(422).json(errMsg(errors.nameLength));
  next();
};

const validQntType = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') return res.status(422).json(errMsg(errors.qntNotNumber));
  next();
};

const validQntValue = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) return res.status(422).json(errMsg(errors.qntValue));
  next();
};

const productExists = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.findByName(name);
  if (product) return res.status(422).json(errMsg(errors.productExists));
  next();
};

const validId = async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) return res.status(422).json(errMsg(errors.wrongId));
  next();
};

const validSale = async (req, res, next) => {
const checkQnt = req.body.every(({ quantity }) => typeof quantity !== 'number' || quantity <= 0); // ajuda do leandro reis
const checkprodId = req.body.every(async ({ productId }) => 
  productsModel.getProductById(productId));
if (checkQnt || !checkprodId) return res.status(422).json(errMsg(errors.wrongIdOrQnt));
next();
};

module.exports = {
  validNameLength,
  validQntType,
  validQntValue,
  productExists,
  validId,
  validSale,
};