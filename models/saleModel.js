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
  const i = '61450d532ce773388599d387';
  return connection.getConnection()
    .then((db) => db.collection('sales').findOne({ _id: ObjectId(i) }));
};

// getSaleById('61450d532ce773388599d387').then((result) => console.log(result));
module.exports = {
  createSale,
  getAllSales,
  getSaleById,
};