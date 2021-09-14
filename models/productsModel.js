const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('products').insertOne({ name, quantity }));
  return { _id: result.insertedId, name, quantity };
};

const findProductByName = async (name) => {
  const result = await connection.getConnection().then((db) =>
    db.collection('products').find({ name }).toArray());
  return result;
};

module.exports = { createProduct, findProductByName };
