const { ObjectId } = require('mongodb');
const { connection } = require('./connection');

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const findProductById = async (id) => {
  const db = await connection();
  const productById = await db.collection('products').findOne(ObjectId(id));
  return productById;
};

const findAllProducts = async () => {
  const db = await connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;
};

const createProduct = async ({ name, quantity }) => {
  const db = await connection();
  const { insertedId: id } = await db.collection('products').insertOne({ name, quantity });
  return { id, name, quantity };
};

const updateProduct = async ({ id, name, quantity }) => {
  const db = await connection();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $set: { name, quantity } });
  return { _id: id, name, quantity };
};

module.exports = {
  createProduct,
  findProductByName,
  findProductById,
  findAllProducts,
  updateProduct,
};
