const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
  const db = await connection.getConnection();
  const product = await db.collection('products').findOne({ name });

  return product !== null;
};

const addProduct = async (name, quantity) => {
  const db = await connection.getConnection();
  const createProductResult = await db.collection('products').insertOne({ name, quantity });

  return { _id: createProductResult.insertedId, name, quantity };
};

const getAllProducts = async () => {
  const db = await connection.getConnection();
  const products = await db.collection('products').find().toArray();

  return { products };
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection.getConnection();
  const getByIdResult = await db.collection('products').find({ _id: ObjectId(id) }).toArray();

  return getByIdResult[0];
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection.getConnection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
  return { _id: id, name, quantity };
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection.getConnection();
  await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return id;
};

module.exports = { 
  addProduct,
  productExists,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
 };