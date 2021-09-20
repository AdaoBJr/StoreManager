// const { ObjectId } = require('mongodb');
const connection = require('../connection');

const getAll = async () => {
  const db = await connection();

  const products = await db.collection('products').find().toArray();

  return products;
};

const getById = async (_id) => {
  const db = await connection();

  const product = db.collection('products').findOne();

  return product;
};

const create = async () => {
  const db = await connection();

  const newProduct = db.collection('products').insertOne();

  return newProduct;
};

const update = async (_id) => {
  const db = await connection();

  const updatedProduct = db.collection('products').update();

  return updatedProduct;
};

const remove = async (_id) => {
  const db = await connection();

  const deletedProduct = db.collection('products').delete();

  return deletedProduct;
};

module.exports = { getAll, getById, create, update, remove };
