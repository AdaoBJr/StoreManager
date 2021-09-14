/* const { ObjectId } = require('mongodb'); */
const connect = require('./connection');

const productExists = async (name) => {
  const db = await connect();
  const nameProduct = await db.collection('products').findOne({ name });

  return nameProduct !== null;
};

const add = async ({ name, quantity }) => {
  const db = await connect();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

module.exports = { add, productExists };
