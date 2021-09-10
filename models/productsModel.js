const connection = require('./connection');

const findByName = async (name) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const result = await productsCollection.findOne({ name });
  return result;
};

const create = async (name, quantity) => {
  const productsCollection = await connection()
    .then((db) => db.collection('products'));

  const response = await productsCollection
    .insertOne({ name, quantity });

  return {
    _id: response.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  create,
  findByName,
};
