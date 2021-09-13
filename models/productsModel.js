const { ObjectId } = require('mongodb');

const connection = require('./mongoConnetion');

const COLLECTION = 'products';

const findProductByName = async (name) => {
  const db = await connection();
  const product = await db.collection(COLLECTION).findOne({ name });

  return product;
};

const createProductModel = async ({ name, quantity }) => {
  const db = await connection();
  const createResult = await db.collection(COLLECTION).insertOne({ name, quantity });

  return { _id: createResult.insertedId, name, quantity };
};

const getAll = async () => {
  const db = await connection();
  const getAllProducts = await db.collection(COLLECTION).find().toArray();

  return getAllProducts;
};

const getProductById = async (id) => {
  const db = await connection();
  const product = await db.collection(COLLECTION).findOne(ObjectId(id));

  return product;
};

module.exports = {
  findProductByName,
  createProductModel,
  getAll,
  getProductById,
};
