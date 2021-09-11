const { ObjectId } = require('mongodb');

const connection = require('./mongoConnetion');

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  if (!product) return null;

  return product;
};

const createProductModel = async ({ name, quantity }) => {
  const db = await connection();
  const createResult = await db.collection('porducts').insertOne({ name, quantity });

  return { _id: createResult.insertedId, name, quantity };
};

const getAll = async () => {
  const db = await connection();
  const getAllProducts = await db.collection('products').find().toArray();
  return getAllProducts;
};

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (!product) return null;
  return product;
};

module.exports = {
  findProductByName,
  createProductModel,
  getAll,
  getProductById,
};
