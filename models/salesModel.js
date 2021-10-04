const { ObjectID } = require('mongodb');
const connection = require('./connection');

const create = async (productsArray) => {
  const salesCollection = await connection().then((db) => db.collection('sales'));
  const response = await salesCollection.insertOne({ itensSold: productsArray });

  return response.ops[0];
};

const getAll = async () => {
  const salesCollection = await connection().then((db) => db.collection('sales'));
  const response = await salesCollection.find().toArray();

  return { sales: response };
};

const getById = async (id) => {
  const salesCollection = await connection().then((db) => db.collection('sales'));
  const response = await salesCollection.findOne(new ObjectID(id));

  return response;
};

const update = async (id, sale) => {
  const salesCollection = await connection().then((db) => db.collection('sales'));

  const response = await salesCollection.updateOne(
    { _id: new ObjectID(id) },
    { $set: { itensSold: sale } },
  );

  return response;
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
