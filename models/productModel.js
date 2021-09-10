const mongoConnection = require('./connection');

const createMod = async ({ name, quantity }) => {
  const moviesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: _id } = await moviesCollection
    .insertOne({ name, quantity });

  return { _id, name, quantity };
};

const getAll = async () => {
  const db = await mongoConnection.getConnection();
  const products = await db.collection('products')
    .find()
    .toArray();

  return products;
};

module.exports = {
  createMod,
  getAll,
};