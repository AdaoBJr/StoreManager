const connect = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });
  return { id, name, quantity };
};

const findByName = async (name) => {
  const db = await connect();
  const products = await db.collection('products').findOne({ name });
  return products;
};

module.exports = {
  createProduct,
  findByName,
};
