const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const getProductById = async (id) => {
  const db = await connection();
  const data = db.collection('products').findOne(ObjectId(id));
  return data;
};

const findProduct = async (name) => {
  const db = await connection();
  return db.collection('products').findOne({ name });
};

const createProduct = async (product) => {
  const db = await connection();
  return db.collection('products').insertOne(product);
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  console.log('model');
  return db.collection('products').updateOne({ _id: ObjectId(id) },
  { $set: { name, quantity } });
};

module.exports = {
  getAllProducts,
  createProduct,
  findProduct,
  getProductById,
  updateProduct,
};
