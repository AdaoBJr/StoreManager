const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (productsArray) => {
  const productsCollection = await connection().then((db) => db.collection('sales'));
  const response = await productsCollection.insertOne({ itensSold: productsArray });

  return response.ops[0];
};

const getAll = async () => {
  const productsCollection = await connection().then((db) => db.collection('sales'));
  const response = await productsCollection.find().toArray();

  return { sales: response };
};

const getById = async (id) => {
  const productsCollection = await connection().then((db) => db.collection('sales'));
  const response = await productsCollection.findOne(new ObjectID(id));

  return response;
};

module.exports = {
  create,
  getAll,
  getById,
};
