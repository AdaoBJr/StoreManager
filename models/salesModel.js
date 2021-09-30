const { ObjectID } = require('mongodb');
const mongoConnection = require('./connection');

const findById = async (id) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('sales'));

  const found = await productsCollection.findOne({ _id: ObjectID(id) });

  return found;
};

const insertSales = async (salesArray) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('sales'));

  const { insertedId: id } = await productsCollection.insertOne({
    itensSold: salesArray,
  });

  return {
    _id: id,
    itensSold: salesArray,
  };
};

module.exports = {
  insertSales,
  findById,
};
