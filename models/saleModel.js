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

module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};