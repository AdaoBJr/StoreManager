const { ObjectId } = require('mongodb');
const connection = require('./connection');

const newProduct = async ({ name, quantity }) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  const { insertedId } = JSON.parse(product);
  return { _id: insertedId, name, quantity };
};

module.exports = {
  newProduct,
};
