const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createProduct = async ({ name, quantity }) => {
  const conn = await connection();
  const newProduct = await conn.collection('products').insertOne({ name, quantity });
  return {
    _id: newProduct.insetedId,
    name,
    quantity,
  };
};

const getByName = async ({ name }) => {
  const conn = await connection();
  const findName = await conn.collection('products').findOne({ name });
  return findName;
};

const getAllProducts = async () => {
  const conn = await connection();
  const getAll = await conn.collection('products').find().toArray();
  return {
    products: [...getAll],
  };
};

const getProductById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }
  const conn = await connection();
  const getById = await conn.collection('products').findOne({ _id: ObjectId(id) });
  return getById;
};

module.exports = { createProduct, getByName, getAllProducts, getProductById };
