const { ObjectId } = require('mongodb');
const mongodb = require('./connection');

const registerNewSale = async (newSale) => {
  const { insertedId } = await mongodb.getConnection()
  .then((db) => db.collection('sales').insertOne({ itensSold: newSale }));
  return { _id: insertedId, itensSold: newSale };
};

const getSales = async () => {
  const sales = await mongodb.getConnection()
  .then((db) => db.collection('sales').find().toArray());
  return { sales };
};

const getSalesById = async (id) => {
  const sales = await mongodb.getConnection()
  .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
  return sales;
};

const updateSale = async ({ id, update }) => {
  await mongodb.getConnection()
  .then((db) => db.collection('sales')
  .updateOne({ _id: ObjectId(id) }, { $set: { itensSold: update } }));
  return getSalesById(id);
};

const deleteSale = async (id) => {
  const sale = await getSalesById(id);
  await mongodb.getConnection()
  .then((db) => db.collection('sales')
  .deleteOne({ _id: ObjectId(id) }));
  return sale;
};

module.exports = {
  registerNewSale,
  getSales,
  getSalesById,
  updateSale,
  deleteSale,
};