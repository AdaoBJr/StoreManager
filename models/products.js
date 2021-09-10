const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAll = async () => {
  const db = await connection();
  const products = await db.collection('products').find().toArray();
  return products;
};

const getById = async (id) => {
  const db = await connection();
  const products = await db.collection('products').findOne({ _id: ObjectId(id) });
  console.log(products);
  return products;
};

const getByName = async (name) => {
  const db = await connection();
  const products = await db.collection('products').findOne({
    name,
  });
  return products;
};

const createProduct = async (name, quantity) => {
  const db = await connection();
  const product = await db.collection('products').insertOne({
    name,
    quantity,
  });
  return product;
};

const deleteById = async (id) => {
  const db = await connection();
  const product = await db.collection('products').deleteOne({
    _id: ObjectId(id),
  });
  console.log(product);
  return product;
};

module.exports = {
  getAll,
  getById,
  getByName,
  createProduct,
  deleteById,
};
