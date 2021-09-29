const mongoConnection = require('./connection');

const create = async (name, quantity) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  const { insertedId: id } = await productsCollection.insertOne({ name, quantity });

  return {
    id,
    name,
    quantity,
  };
};

const findByName = async (name) => {
  const productsCollection = await mongoConnection.connection()
  .then((db) => db.collection('products'));

  const found = await productsCollection.findOne({ name });

  if (found) return true;
};

module.exports = {
  create,
  findByName,
};
