const SaleModal = require('../models/SaleModel');
const ProductModel = require('../models/ProductModels');

const ERR_QUANTITY = {
  err: { code: 'invalid_data', message: 'Wrong product ID or invalid quantity' },
};

const ERR_NOT_FOUND = {
  err: { code: 'not_found', message: 'Sale not found' },
};

const ERR_ID = {
  err: { code: 'invalid_data', message: 'Wrong sale ID format' },
};

const ERR_STOCK = {
  err: { code: 'stock_problem', message: 'Such amount is not permitted to sell' },
};

function isValidQuantity(quantity) {
  if (quantity <= 0) return false;
  if (typeof quantity === 'string') return false;
  return true;
}

async function insert(salesInfo) {
  const isNotValid = salesInfo.find(({ quantity }) => (!isValidQuantity(quantity)));
  if (isNotValid) return ERR_QUANTITY;

  const { name, quantity } = await ProductModel.findById(salesInfo[0].productId);
  if (quantity >= salesInfo[0].quantity) {
    const newQuantity = quantity - salesInfo[0].quantity;
    await ProductModel.update(salesInfo[0].productId, { name, quantity: newQuantity });

    const insertProduct = await SaleModal.create(salesInfo);
    return insertProduct;
  }

  return ERR_STOCK;
}

async function getAllProduct() {
  const allProducts = await SaleModal.getAll();

  return allProducts;
}

async function getProductById(id) {
  const product = await SaleModal.findById(id);
  if (!product) return ERR_NOT_FOUND;

  return product;
}

async function updateProduct(id, salesInfo) {
  const isNotValid = salesInfo.find(({ quantity }) => (!isValidQuantity(quantity)));
  if (isNotValid) return ERR_QUANTITY;

  const product = await SaleModal.update(id, salesInfo);

  return product;
}

async function deleteProduct(id) {
  const findSale = await SaleModal.findById(id);
  if (!findSale) return ERR_ID;

  const { _id, name, quantity } = await ProductModel.findById(findSale.itensSold[0].productId);
  const newQuantity = quantity + findSale.itensSold[0].quantity;
  await ProductModel.update(_id, { name, quantity: newQuantity });

  const exludeProduct = await SaleModal.exclude(id);

  return exludeProduct;
}

module.exports = {
  insert,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
