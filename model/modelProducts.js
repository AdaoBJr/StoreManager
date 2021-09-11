const getConnection = require('./connection');

const create = async ({ name, quantity }) => {
  const db = await getConnection();

  // insere produto no db
  const product = await db.collection('products').insertOne({ name, quantity });

  return product;
};

module.exports = { create };
