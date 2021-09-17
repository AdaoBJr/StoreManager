const connection = require('./connection');

const create = async (name, quantity) => {
  connection()
    .then((db) => db.collection('StoreManager')).insertOne({ name, quantity });
};

const findByName = async (name) => {
  const productName = await connection()
    .then((db) => db.collection('StoreManager')).findOne({ name });

  if (!productName) return null;

  return productName;
};

module.exports = {
  create,
  findByName,
};