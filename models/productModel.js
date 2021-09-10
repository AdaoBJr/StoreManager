// const { ObjectId } = require('mongodb');
const connectionMongo = require('./connection');

const create = async (name, quantity) => {
  const db = await connectionMongo();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { id: product.insertedId, name, quantity };
};
 
const getAll = async () => {
  const db = await connectionMongo();
  const products = await db.collection('products').find().toArray();
  return { products }; 
};

module.exports = { create, getAll };
