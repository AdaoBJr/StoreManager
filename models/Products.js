const connection = require('./connection');

const create = async (product) => {
  const db = await connection();
  const { ops } = await db.collection('products').insertOne(product);

  return ops[0];
};

const findByName = async (name) => {
  const db = await connection();

  return db.collection('products').findOne({ name });
};

module.exports = {
  create,
  findByName,
};
