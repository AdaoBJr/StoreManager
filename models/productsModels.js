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
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const findById = await db.collection('products')
  .findOne({ _id: ObjectId(id) });
  return findById;
};

const updateProductById = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  await db.collection('products')
  .updateOne({ _id: ObjectId(id) }, 
  { $set: { name, quantity } });
  return {
    _id: id,
    name, 
    quantity,
  }; 
};

const deleteProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await mongoConnection.getConnection();
  const deleteId = await db.collection('products')
  .findOneAndDelete({ _id: ObjectId(id) });
  return deleteId.value;
};

module.exports = { 
  getAllProducts,
  createProduct,
  findByName,
  getProductById,
  updateProductById,
  deleteProductById,
 };