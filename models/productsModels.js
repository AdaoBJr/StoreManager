const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getAllProducts = async () => {
  const db = await mongoConnection.getConnection();
  const products = await db.collection('products')
    .find()
    .toArray();
  return products;
};

const findByName = async (name) => {
  const db = await mongoConnection.getConnection();
  const findProducts = await db.collection('products')
  .findOne({ name });
  return findProducts !== null;
};

const createProduct = async (name, quantity) => {
  const db = await mongoConnection.getConnection();
  const products = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: products.insertedId,
    name, 
    quantity,
  };
};

const getProductById = async (id) => {
  const db = await mongoConnection.getConnection();
  const findById = await db.collection('products')
  .findOne({ _id: ObjectId(id) });
  // console.log(findById);
  return findById;
};

module.exports = { 
  getAllProducts,
  createProduct,
  findByName,
  getProductById,
 };