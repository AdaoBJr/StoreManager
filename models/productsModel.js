const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('produtos').insertOne({ name, quantity }));
  return { id: result.insertedId, name, quantity };
};

const findProductByName = async (name) => {
  connection.getConnection().then((db) =>
    db.collection('produtos').find({ name }));
};

module.exports = { createProduct, findProductByName };
