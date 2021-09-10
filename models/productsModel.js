const mongoConnect = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

  return { id };
};

const findByName = async (name) => {
  const productsCollection = await mongoConnect.getConnection()
    .then((db) => db.collection('products'));

  const result = await productsCollection
    .findOne({ name }, { _id: 0, name: 1 });

  return !result;
};

module.exports = {
  create,
  findByName,
};
