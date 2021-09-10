const { ObjectId } = require('mongodb');
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

const getById = async (id) => {
  if (!ObjectId.isValid(id)) return null; 
  const db = await connectionMongo();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  return product;
};

module.exports = { create, getAll, getById };
