const { ObjectId } = require('mongodb');
const connect = require('./connection');

const getAll = async () => {
  const db = await connect.connection();
  const allProducts = await db.collection('products').find().toArray();
  return allProducts;  
};

const getById = async ({ id }) => {
  const db = await connect.connection();
  const product = await db.collection('products').findOne(ObjectId(id));
  console.log(product, 'produto achado no model');
  if (!product) {
    return false;
  }
  return product;
};

const productExists = async ({ name }) => {
  const db = await connect.connection();
  const product = await db.collection('products').findOne({ name });
  return product;
};

const create = async ({ name, quantity }) => {
  const db = await connect.connection();
  const product = await db.collection('products').insertOne({ name, quantity });
  return {
    _id: product.insertedId,
    name,
    quantity,
  };
};

module.exports = {
  getAll, 
  getById,
  productExists,
  create,
};