const { ObjectID } = require('mongodb');
const mongoConnection = require('./connection');

const findById = async (id) => {
  const salesCollection = await mongoConnection.connection()
  .then((db) => db.collection('sales'));

  const found = await salesCollection.findOne({ _id: ObjectID(id) });

  return found;
};

const insertSales = async (salesArray) => {
  const salesCollection = await mongoConnection.connection()
  .then((db) => db.collection('sales'));

  const { insertedId: id } = await salesCollection.insertOne({
    itensSold: salesArray,
  });

  return {
    _id: id,
    itensSold: salesArray,
  };
};

const getAllSales = async () => {
  const salesCollection = await mongoConnection.connection()
  .then((db) => db.collection('sales'));

  const allSales = await salesCollection.find()
  .toArray();

  return {
    sales: allSales,
  };
};

const findSaleById = async (saleId) => {
  const salesCollection = await mongoConnection.connection()
  .then((db) => db.collection('sales'));

  const found = await salesCollection.findOne({ _id: ObjectID(saleId) });

  return found;
};

module.exports = {
  insertSales,
  findById,
  getAllSales,
  findSaleById,
};
