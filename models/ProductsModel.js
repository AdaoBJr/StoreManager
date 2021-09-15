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
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('products')
  .findOne(ObjectId(id));
  return result;
};

const putProductsAll = async (id, name, quantity) => {
  const db = await connection();
  const result = await db.collection('products')
  .updateOne(
    { _id: ObjectId(id) }, { $set: { name, quantity } },
  );
  return result;
};

const deletProducts = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const db = await connection();
  const result = await db.collection('products')
  .findOneAndDelete({ _id: ObjectId(id) });
  return result;
};

const incrementProducts = async (productId, quantity) => {
  const { value } = await connection()
  .then((db) => db.collection('products')
  .findOneAndUpdate({ _id: ObjectId(productId) }, { $inc: { quantity } }));

  return value;
};

const decrementProducts = async (productId, quantity) => {
  const result = await connection()
  .then((db) => db.collection('products')
  .findOneAndUpdate({ _id: ObjectId(productId) }, { $inc: { quantity: -quantity } }));

  return result;
};

  module.exports = {
    createProduct,
    findByName,
    getProductsAll,
    getProductsById,
    putProductsAll,
    deletProducts,
    incrementProducts,
    decrementProducts,

  };