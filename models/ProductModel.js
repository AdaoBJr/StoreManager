const mongoConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const productsCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('products'));

    const { insertedId: id } = await productsCollection
    .insertOne({ name, quantity });

    return {
      id,
      name,
      quantity,
    };
  };

const findByName = async (name) => {
  const productsCollection = await mongoConnection.getConnection()
  .then((db) => db.collection('products'));

  const product = await productsCollection.findOne({ name });

  return product;
};

module.exports = {
  create,
  findByName,
};