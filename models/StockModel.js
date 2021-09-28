const { ObjectId } = require('mongodb');

const connection = require('./connection');
const ProductsModel = require('./ProductsModel');

const COLLECTION = 'products';

async function update(productId, quantity) {
  await connection()
    .then((db) => db.collection(COLLECTION).updateOne(
      { _id: ObjectId(productId) },
      { $set: { quantity } },
      { returnOriginal: false },
  ));
}

async function bulkUpdate(data, isCreation = true, isDelete = false) {
  return data.forEach(async ({ productId, quantity }) => {
    const { product } = await ProductsModel.getById(productId);

    if (isDelete) {
      const newQuantity = product.quantity + quantity;
      return update(productId, newQuantity);
    }

    if (isCreation) {
      const newQuantity = product.quantity - quantity;

      return update(productId, newQuantity);
    }

    const newQuantity = product.initialStock - quantity;

    return update(productId, newQuantity);
  });
}

async function createStock(data) {
  await bulkUpdate(data, true, false);

  return '';
}

async function updateStock(data) {
  await bulkUpdate(data, false, false);

  return '';
}

async function restoreStock(data) {
  const bulkData = data.itensSold;

  await bulkUpdate(bulkData, false, true);

  return '';
}

module.exports = { createStock, updateStock, restoreStock };