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

const update = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;

  const db = await connectionMongo();
  await db.collection('products')
      .updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });

  return { id, name, quantity };
};

const remove = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connectionMongo();
  const product = await db.collection('products').findOne({ _id: ObjectId(id) });
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return product;
};

module.exports = { create, getAll, getById, update, remove };
