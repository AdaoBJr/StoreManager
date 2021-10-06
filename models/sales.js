const { ObjectId } = require('mongodb');
const connection = require('./connection');

const allSales = async () =>
connection()
  .then((db) => db.collection('sales').find().toArray())
  .then((result) => ({ sales: result }));

const selectById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const newSale = async (sale) =>
  connection()
    .then((db) => db.collection('sales').insertOne({ itensSold: sale }))
    .then((result) => result.ops[0]);

const saleUpdate = async (id, sale) => {
  if (!ObjectId.isValid(id)) return null;
  await connection()
    .then((db) => db.collection('sales').updateOne(
      { _id: ObjectId(id) }, { $set: { itensSold: sale } },
    ));
  return {
    _id: id, itensSold: sale,
  };
};

const saleDelete = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  return connection()
    .then((db) => db.collection('sales').findOneAndDelete({ _id: ObjectId(id) }))
    .then((result) => result.value);
};

const salesStock = async (id, quantity) => {
  const storage = await connection()
  .then((db) => db.collection('products').findOne({ _id: ObjectId(id) }));
  if (storage.quantity - quantity < 0) return null;
  return connection()
    .then((db) => db.collection('products').updateOne(
      { _id: ObjectId(id) }, { $inc: { quantity: -quantity } },
    ));
};

module.exports = {
  newSale,
  allSales,
  selectById,
  saleUpdate,
  saleDelete,
  salesStock,
};
