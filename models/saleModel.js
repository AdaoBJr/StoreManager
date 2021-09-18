const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createSale = async ({ itensSold }) => connection.getConnection()
  .then((db) => db.collection('sales').insertOne({ itensSold }))
  .then((result) => result.ops[0]);

const getAllSales = async () => connection.getConnection()
  .then((db) => db.collection('sales').find().toArray());

const getSaleById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(id) }));
};

const updateSale = async ({ id, itensSold }) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
  .then((db) => db.collection('sales')
    .updateOne(
      { _id: ObjectId(id) },
      { $set: { itensSold } },
    ))
  .then(() => ({ _id: id, itensSold }));
};

/*
  Material consultado sobre findOneAndDelete
  https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndDelete/#delete-a-document
*/
const removeSale = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  return connection.getConnection()
  .then((db) => db.collection('sales')
    .findOneAndDelete({ _id: ObjectId(id) }))
  .then((result) => result.value);
};

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
  updateSale,
  removeSale,
};