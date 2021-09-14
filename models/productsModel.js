const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async ({ name }) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return await product !== null;
};

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();

  if (!products) return false;

  return products;
};

const getById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  return product;
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const createdProductResult = await db.collection('products').insertOne({ name, quantity });

  return { _id: createdProductResult.insertedId, name, quantity };
};

module.exports = {
  create,
  productExists,
  getAll,
  getById,
};