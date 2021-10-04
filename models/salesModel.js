const connection = require('./connection');

const create = async (productsArray) => {
  const productsCollection = await connection()
    .then((db) => db.collection('sales'));

  const response = await productsCollection
    .insertOne({ itensSold: productsArray });
  return response.ops[0];
};

module.exports = {
  create,
};
