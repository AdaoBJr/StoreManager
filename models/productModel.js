const { ObjectId } = require('mongodb');
const connection = require('./connection');

const productExists = async (name) => {
  const db = await connection();
  const product = await db.collection('products').findOne({ name });

  return product !== null;
};

const getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return {
    products,
  };
};

const getById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').findOne(ObjectId(id));

  if (!product) return null;

  const { name, quantity } = product;

  return {
    _id: id,
    name,
    quantity,
  };
};

const create = async ({ name, quantity }) => {
  const db = await connection();
  const createdProduct = await db.collection('products').insertOne({ name, quantity });

  return {
    _id: createdProduct.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  productExists,
  getAll,
  getById,
  create,
};