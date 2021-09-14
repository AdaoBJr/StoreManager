const { ObjectId } = require('mongodb');
const connect = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const db = await connect();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });
  return { id, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
  const db = await connect();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
};

const findByName = async (name) => {
  const db = await connect();
  const products = await db.collection('products').findOne({ name });
  return products;
};

const findAllProducts = async () => {
  const db = await connect();
  const products = await db.collection('products').find().toArray();
  return products;
};

const findProductById = async (id) => {
  const db = await connect();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const deleteProduct = async (id) => {
  const db = await connect();
  const deleted = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  const { name, quantity } = deleted;
  return { _id: id, name, quantity };
};

module.exports = {
  createProduct,
  findByName,
  findAllProducts,
  findProductById,
  updateProduct,
  deleteProduct,
};
