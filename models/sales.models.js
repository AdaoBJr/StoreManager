const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (itensSold) => {
  const db = await connection();
  const newSale = await db.collection('sales').insertOne({ itensSold });
  return { _id: newSale.insertedId, itensSold };
};

const getAll = async () => {
  const db = await connection();
  const allSales = await db.collection('sales').find().toArray();
  return allSales;
};

const getSaleById = async (id) => {
  const db = await connection();
  const sale = await db.collection('sales').findOne(ObjectId(id));
  return sale;
};

const update = async (id, updates) => {
  const db = await connection();
  const { matchedCount } = await db.collection('sales')
    .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: updates } });
  if (matchedCount) {
    const sale = await getSaleById(id);
    return sale;
  }
};

const removeSale = async (id) => {
  const db = await connection();
  const { deletedCount } = await db.collection('sales').deleteOne({ _id: ObjectId(id) });
  return deletedCount;
};

const updateProductsQuantity = async (id, quantity, operation) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  if (product) {
    if (operation === 'sale') product.quantity -= quantity;
    if (operation === 'update/delete') product.quantity += quantity;
    await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: product });
  }

  return product;
};

module.exports = { create, getAll, getSaleById, update, removeSale, updateProductsQuantity };
