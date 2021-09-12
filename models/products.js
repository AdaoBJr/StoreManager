const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllProducts = async () => {
  const db = await connection();
  const data = db.collection('products').find().toArray();
  return data;
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

module.exports = {
  getAllProducts,
  createProduct,
  findProduct,
  getProductById,
};
