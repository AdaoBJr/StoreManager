const SaleModel = require('../models/SaleModel');
const ProductModel = require('../models/ProductModel');

const productIdErrMsg = { err: {
  code: 'invalid_data',
  message: 'Wrong product ID or invalid quantity',
} };

const validateProducts = (sale) => sale.map(({ productId, quantity }) => {
  const product = ProductModel.findById(productId);

  if (!product || quantity <= 0 || !Number.isInteger(quantity)) return false;

  return true;
});

const findAll = () => SaleModel.findAll();

const findById = async (id) => {
  const sale = await SaleModel.findById(id);
  if (!sale) {
    return {
      err: {
        code: 'not_found',
        message: 'Sale not found',
      },
    };
  }

  return sale;
};

const create = async (sale) => {
  const checkProducts = validateProducts(sale);

  if (checkProducts.includes(false)) {
    return productIdErrMsg;
  }

  return SaleModel.create(sale);
};

const update = async (id, sale) => {
  const checkProducts = validateProducts(sale);

  if (checkProducts.includes(false)) {
    return productIdErrMsg;
  }

  return SaleModel.update(id, sale);
};

const exclude = async (id) => {
  const sale = await SaleModel.findById(id);

  if (!sale) {
    return { err: {
      code: 'invalid_data',
      message: 'Wrong sale ID format',
    } };
  }

  return SaleModel.exclude(id);
};

module.exports = { create, findAll, findById, update, exclude };
