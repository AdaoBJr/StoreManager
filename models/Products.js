const { connection } = require('./connection');

const create = async (name, quantity) => {
  connection()
    .then((db) => db.collection('products').insertOne({ name, quantity }));
};

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('products').findOne({ name }));

  if (!productName) return null;

  return productName;
};

module.exports = {
  create,
  findByName,
};