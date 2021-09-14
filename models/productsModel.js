const { ObjectId } = require('mongodb');
const connection = require('./connection');

const registerProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return { _id: product.insertedId, name, quantity };
};

const findProduct = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product !== null;
};

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const getProducts = async () => {
  const db = await connection();
  const product = await db.collection('products').find().toArray();
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
  const productUpdated = await db.collection('products').findOne(ObjectId(id));
  return productUpdated;
};

const deleteProduct = async (id) => {
  const db = await connection();
  const productDeleted = await db.collection('products').deleteOne({ _id: ObjectId(id) });
  return productDeleted;
};

module.exports = {
  registerProduct,
  findProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
