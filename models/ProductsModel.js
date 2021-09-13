const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async (name, quantity) => {
  const { insertedId } = await connection()
  .then((db) => db.collection('products').insertOne({ name, quantity }));

  return { _id: insertedId, name, quantity };
};

const findByName = async (name) => {
    const db = await connection();
    const product = await db.collection('products').findOne({ name });
    if (product) {
      return true;
    }
    return false;
};

const getProductsAll = async () => {
  const db = await connection();
  const result = await db.collection('products').find().toArray();
  return { products: result };
};

const getProductsById = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const db = await connection();
  const result = await db.collection('products')
  .findOne(ObjectId(id));
  return result;
};

  module.exports = {
    createProduct,
    findByName,
    getProductsAll,
    getProductsById,
  };