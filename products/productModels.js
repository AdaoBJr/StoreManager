const { ObjectId } = require('mongodb');
const connection = require('../mongoDBConnection');

const productExists = async (name) => {
  const db = await connection();

  const product = await db.collection('products').findOne({ name });

  return product !== null;
};

const getAllProducts = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return products;
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  const product = await db.collection('products').findOne({ _id: ObjectId(id) });

  return product;
};

const createProduct = async (name, quantity) => {
  const db = await connection();

  const createdProduct = await db.collection('products').insertOne({ name, quantity });

  return { id: createdProduct.insertedId, name, quantity };
};

const updateProduct = async (id, name, quantity) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  const product = await db.collection('products').updateOne(
      { _id: ObjectId(id) },
      { $set: { name, quantity } },
  );

  return product;
};

const deleteProduct = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();

  return db.collection('products').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  productExists,
};
