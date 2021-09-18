const { ObjectId } = require('mongodb');
const saleModel = require('../models/saleModel');
// const productModel = require('../models/productModel');

const createSale = async (itensSold) => {
  // console.log(itensSold);

  // const itensSoldIDs = itensSold.filter((id) => id.productId);
  // console.log(itensSoldIDs);

  // const productExists = await productModel.productIdExists(itensSold.productId);
  // console.log(productExists);

  // if (!productExists || itensSold.quantity <= 0 || typeof itensSold.quantity !== 'number') {
  //   return { erro: 'Wrong product ID or invalid quantity' };
  // }

  // ajuda de Fernanda Porto
  const itens = itensSold
  .find((obj) => obj.quantity <= 0 || typeof obj.quantity !== 'number');
  if (itens) return { erro: 'Wrong product ID or invalid quantity' };

  return saleModel.create(itensSold);
};

const updateSale = async ({ id, itensSold }) => {
  const itens = itensSold
  .some((obj) => obj.quantity <= 0 || typeof obj.quantity !== 'number');
  if (itens) {
    return { erro: 'Wrong product ID or invalid quantity' };
  }
   const test = await saleModel.update({ id, itensSold });
  return test;
};

const excludeSale = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const sale = await saleModel.saleIdExists(id);
  if (!sale) return null;

  const { _id, itensSold } = sale;
  await saleModel.exclude(id);
  return { _id, itensSold };
};

module.exports = { createSale, updateSale, excludeSale };