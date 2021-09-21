const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function findByName(name) {
  const db = await connection();
  const result = await db.collection('products').findOne({ name });
  return result;
}

async function findById(id) {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('products').findOne({ _id: ObjectId(id) });
  return result;
}

async function createProduct(name, quantity) {
  const db = await connection();
  const result = await db.collection('products').insertOne({ name, quantity });
  return { _id: result.insertedId, name, quantity };
}

async function fetchProducts() {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return result;
}

async function updateProduct(id, name, quantity) {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) },
    { $set: { name, quantity } },
  );
  return { _id: id, name, quantity };
}

async function deleteProduct(id) {
  const db = await connection();
  const result = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return result;
}

module.exports = {
  findByName,
  findById,
  createProduct,
  fetchProducts,
  updateProduct,
  deleteProduct,
};