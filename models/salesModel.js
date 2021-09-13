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

module.exports = {
  registerNewSale,
  getSales,
  getSalesById,
};