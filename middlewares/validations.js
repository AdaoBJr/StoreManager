const productsModel = require('../models/productsModel');
const salesModel = require('../models/salesModel');

const errors = {
  nameLength: '"name" length must be at least 5 characters long',
  qntNotNumber: '"quantity" must be a number',
  qntValue: '"quantity" must be larger than or equal to 1',
  productExists: 'Product already exists',
  wrongId: 'Wrong id format',
  wrongIdOrQnt: 'Wrong product ID or invalid quantity',
  saleNotFound: 'Sale not found',
};

const invData = (message) => ({ err: { code: 'invalid_data', message } });
const notFound = (message) => ({ err: { code: 'not_found', message } });

const validNameLength = (req, res, next) => {
  const { name } = req.body;
  if (name.length <= 5) return res.status(422).json(invData(errors.nameLength));
  next();
};

const validQntType = (req, res, next) => {
  const { quantity } = req.body;
  if (typeof quantity !== 'number') return res.status(422).json(invData(errors.qntNotNumber));
  next();
};

const validQntValue = (req, res, next) => {
  const { quantity } = req.body;
  if (quantity <= 0) return res.status(422).json(invData(errors.qntValue));
  next();
};

const productExists = async (req, res, next) => {
  const { name } = req.body;
  const product = await productsModel.findByName(name);
  if (product) return res.status(422).json(invData(errors.productExists));
  next();
};

const validId = async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) return res.status(422).json(invData(errors.wrongId));
  next();
};

const validSale = async (req, res, next) => {
const checkQnt = req.body.every(({ quantity }) => typeof quantity !== 'number' || quantity <= 0); // ajuda do leandro reis
const checkprodId = req.body.every(async ({ productId }) => 
  productsModel.getProductById(productId));
if (checkQnt || !checkprodId) return res.status(422).json(invData(errors.wrongIdOrQnt));
next();
};

const saleExists = async (req, res, next) => {
  const { id } = req.params;
  if (id.length !== 24) return res.status(404).json(notFound(errors.saleNotFound));
  const sale = await salesModel.getSaleById(id);
  if (!sale) return res.status(404).json(notFound(errors.saleNotFound));
  next();
};

module.exports = {
  validNameLength,
  validQntType,
  validQntValue,
  productExists,
  validId,
  validSale,
  saleExists,
};