const connect = require('./connection');

const productExists = async (name) => {
  const db = await connect();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const create = async (name, quantity) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return {
    id: product.insertedId,
    name,
    quantity,
  };
};

module.exports = { productExists, create };