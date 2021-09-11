const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const db = await connection();
  const createdProduct = await db.collection('products').insertOne({ name, quantity });

  return { _id: createdProduct.insertedId, name, quantity };
};

const productExists = async (name) => {
  const db = await connection();
  const wasFound = await db.collection('products').findOne({ name });

  return wasFound !== null;
};

const getAll = async () => {
  const db = await connection();
  return db.collection('products').find().toArray();
};

const isValidId = async (id) => ObjectId.isValid(id);

const findById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const updateProduct = async (id, name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );

  return product;
};

const removeProduct = async (id) => {
  const db = await connection();
  const { value } = await db.collection('products').findOneAndDelete({ _id: ObjectId(id) });
  
  return value;
};

const updateDB = async (id, quantity) => {
  const db = await connection();
  await db.collection('products').updateOne({ _id: ObjectId(id) }, { $inc: { quantity } });
};

module.exports = {
  createProduct,
  productExists,
  getAll,
  isValidId,
  findById,
  updateProduct,
  removeProduct,
  updateDB,
  
};