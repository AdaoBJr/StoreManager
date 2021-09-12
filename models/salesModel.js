// const { ObjectId } = require('mongodb');
const mongoConnect = require('./connection');

const create = async ({ itensSold }) => {
  const salesCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('sales'));

  const { insertedId: id } = await salesCollection
    .insertOne({ itensSold });

  return { id };
};

module.exports = {
  create,
};