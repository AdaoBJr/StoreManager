const { ObjectId } = require('mongodb');
const connection = require('./connection');

async function create({ name, quantity }) {
  const db = await connection();
  const createdProduct = await db.collection('products').insertOne({ name, quantity });

  return createdProduct.ops[0];
}

async function getProductByName(name) {
  const db = await connection();

  const product = await db.collection('products').findOne({ name });
  if (!product) return null;

  return product;
}

async function getAll() {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  return products;
}

async function getById(id) {
  if (!ObjectId.isValid(id)) return null;

  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  return product;
}

module.exports = {
  create,
  getProductByName,
  getAll,
  getById,
};